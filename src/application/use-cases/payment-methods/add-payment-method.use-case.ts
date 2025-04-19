import { PaymentMethodsInsert } from "../../../drizzle/schema/payment_methods.ts";
import { IPaymentMethodsRepository } from "../../repositories/payment-methods/payment-methods.repository.interface.ts";

export type IAddPaymentMethodUseCase = ReturnType<
    typeof addPaymentMethodUseCase
>;
export const addPaymentMethodUseCase =
    (paymentMethodsRepository: IPaymentMethodsRepository) =>
    async (data: PaymentMethodsInsert) => {
        return paymentMethodsRepository.addPaymentMethod(data);
    };
