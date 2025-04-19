import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types.ts";
import { PaymentMethodsRepository } from "../../infrastructure/repositories/payment-methods/payment-methods.repository.ts";
import { getPaymentMethodsUseCase } from "../../application/use-cases/payment-methods/get-payment-methods.use-case.ts";
import { addPaymentMethodUseCase } from "../../application/use-cases/payment-methods/add-payment-method.use-case.ts";
import { removePaymentMethodUseCase } from "../../application/use-cases/payment-methods/remove-payment-method.use-case.ts";

export function createPaymentMethodsModule() {
    const paymentMethodsModule = createModule();

    paymentMethodsModule
        .bind(DI_SYMBOLS.IPaymentMethodsRepository)
        .toClass(PaymentMethodsRepository);

    paymentMethodsModule
        .bind(DI_SYMBOLS.IGetPaymentMethodsUseCase)
        .toHigherOrderFunction(getPaymentMethodsUseCase, [
            DI_SYMBOLS.IPaymentMethodsRepository,
        ]);

    paymentMethodsModule
        .bind(DI_SYMBOLS.IAddPaymentMethodUseCase)
        .toHigherOrderFunction(addPaymentMethodUseCase, [
            DI_SYMBOLS.IPaymentMethodsRepository,
        ]);

    paymentMethodsModule
        .bind(DI_SYMBOLS.IRemovePaymentMethodUseCase)
        .toHigherOrderFunction(removePaymentMethodUseCase, [
            DI_SYMBOLS.IPaymentMethodsRepository,
        ]);

    return paymentMethodsModule;
}
