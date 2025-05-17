import axios from "axios";
import { InitiatePaymentOptions } from "../models/payments/initiate-payment";
import crypto from "crypto";
import {
  GetPaymentStatusOptions,
  GetPaymentStatusResponse,
  getPaymentStatusResponseSchema,
} from "../models/payments/get-payment-status";

export class MyPos {
  static baseUrl = process.env.MYPOS_BASE_URL!
  static ipcVersion = "1.4.1";
  static language = "BG";
  static partnerId = process.env.MYPOS_PARTNER_ID!;
  static appId = process.env.MYPOS_APP_ID!
  static keyIndex = +process.env.MYPOS_KEY_INDEX!
  static walletNumber = process.env.MYPOS_WALLET_NUMBER!
  static storeId = process.env.MYPOS_STORE_ID!

  private static generateSignature(opts: Record<string, string | number>) {
    const concatString = Object.values(opts).join("-");

    const base64Data = Buffer.from(concatString).toString("base64");

    const sign = crypto.createSign("SHA256");
    sign.update(base64Data);
    sign.end();

    return sign.sign(process.env.MYPOS_PRIVATE_KEY!, "base64");
  }

  private static createBasicFormDataObject(method: string): Record<string, string | number>  {
    return {
        IPCmethod: method,
        IPCLanguage: this.language,
        IPCVersion: this.ipcVersion,
        PartnerID: this.partnerId,
        ApplicationID: this.appId,
        KeyIndex: this.keyIndex,
        WalletNumber: this.walletNumber,
        SID: this.storeId
    }
  }

  static async getPaymentStatus(opts: GetPaymentStatusOptions): Promise<GetPaymentStatusResponse> {
    const fields: Record<string, string | number> = {
      ...this.createBasicFormDataObject("IPCGetPaymentStatus"),
      OrderID: opts.orderId,
      OutputFormat: "JSON"
    }

    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value.toString());
    })

    formData.append("Signature", MyPos.generateSignature(fields));

    const {data} = await axios.post(this.baseUrl, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const {data: response, error} = getPaymentStatusResponseSchema.safeParse(data);
    if (error) throw new Error(`Invalid payment status response: ${error}`);

    return response;
  }

  static async initiatePayment(opts: InitiatePaymentOptions): Promise<string> {
    const formData = new FormData();

    const { Cart, ...cartRemovedOptions } = opts;

    let fields: Record<string, string | number> = {
      ...this.createBasicFormDataObject("IPCPurchase"),
      ...cartRemovedOptions,
    };

    for (let i = 0; i < Cart.length; i++) {
      fields = {
        ...fields,
        [`Article_${i + 1}`]: Cart[i].Article,
        [`Quantity_${i + 1}`]: Cart[i].Quantity,
        [`Price_${i + 1}`]: Cart[i].Price,
        [`Amount_${i + 1}`]: Cart[i].Quantity * Cart[i].Price,
        [`Currency_${i + 1}`]: Cart[i].Currency,
      }
    }

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    formData.append("Signature", MyPos.generateSignature(fields));
    // console.log(Array.from(formData.entries()));
    const {data} = await axios.post<string>(this.baseUrl, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    return data;
  }
}