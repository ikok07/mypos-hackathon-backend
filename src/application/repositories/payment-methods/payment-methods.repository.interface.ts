import {
    PaymentMethods,
    PaymentMethodsInsert,
} from "../../../drizzle/schema/payment_methods.ts";

export interface IPaymentMethodsRepository {
    getPaymentMethods(): Promise<PaymentMethods[]>;
    addPaymentMethod(data: PaymentMethodsInsert): Promise<PaymentMethods[]>;
    removePaymentMethod(paymentMethodId: string): Promise<PaymentMethods>;
}
