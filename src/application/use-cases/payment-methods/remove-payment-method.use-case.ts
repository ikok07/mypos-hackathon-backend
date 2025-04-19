import { IPaymentMethodsRepository } from "../../repositories/payment-methods/payment-methods.repository.interface.ts";

export type IRemovePaymentMethodUseCase = ReturnType<
    typeof removePaymentMethodUseCase
>;
export const removePaymentMethodUseCase =
    (paymentMethodsRepository: IPaymentMethodsRepository) =>
    (paymentMethodId: string) => {
        return paymentMethodsRepository.removePaymentMethod(paymentMethodId);
    };
