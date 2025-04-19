import { IPaymentMethodsRepository } from "../../repositories/payment-methods/payment-methods.repository.interface.ts";

export type IGetPaymentMethodsUseCase = ReturnType<
    typeof getPaymentMethodsUseCase
>;
export const getPaymentMethodsUseCase =
    (paymentMethodsRepository: IPaymentMethodsRepository) => () => {
        return paymentMethodsRepository.getPaymentMethods();
    };
