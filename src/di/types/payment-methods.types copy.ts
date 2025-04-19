import { ICustomerVisitsRepository } from "../../application/repositories/customer-visits/customer-visits.repository.interface.ts";
import { IPaymentMethodsRepository } from "../../application/repositories/payment-methods/payment-methods.repository.interface.ts";
import { IAddCustomerVisitUseCase } from "../../application/use-cases/customer-visits/add-customer-visit.use-case.ts";
import { IGetCustomerVisitsUseCase } from "../../application/use-cases/customer-visits/get-customer-visits.use-case.ts";
import { IAddPaymentMethodUseCase } from "../../application/use-cases/payment-methods/add-payment-method.use-case.ts";
import { IGetPaymentMethodsUseCase } from "../../application/use-cases/payment-methods/get-payment-methods.use-case.ts";
import { IRemovePaymentMethodUseCase } from "../../application/use-cases/payment-methods/remove-payment-method.use-case.ts";

export const PAYMENT_METHODS_SYMBOLS = {
    IPaymentMethodsRepository: Symbol.for("IPaymentMethodsRepository"),
    IGetPaymentMethodsUseCase: Symbol.for("IGetPaymentMethodsUseCase"),
    IAddPaymentMethodUseCase: Symbol.for("IAddPaymentMethodUseCase"),
    IRemovePaymentMethodUseCase: Symbol.for("IRemovePaymentMethodUseCase"),
};

export interface PAYMENT_METHODS_TYPES {
    IPaymentMethodsRepository: IPaymentMethodsRepository;
    IGetPaymentMethodsUseCase: IGetPaymentMethodsUseCase;
    IAddPaymentMethodUseCase: IAddPaymentMethodUseCase;
    IRemovePaymentMethodUseCase: IRemovePaymentMethodUseCase;
}
