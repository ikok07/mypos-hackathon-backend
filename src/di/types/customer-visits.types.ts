import { ICustomerVisitsRepository } from "../../application/repositories/customer-visits/customer-visits.repository.interface.ts";
import { IAddCustomerVisitUseCase } from "../../application/use-cases/customer-visits/add-customer-visit.use-case.ts";
import { IGetCustomerVisitsUseCase } from "../../application/use-cases/customer-visits/get-customer-visits.use-case.ts";

export const CUSTOMER_VISITS_CARDS_SYMBOLS = {
    ICustomerVisitsRepository: Symbol.for("ICustomerVisitsRepository"),
    IGetCustomerVisitsUseCase: Symbol.for("IGetCustomerVisitsUseCase"),
    IAddCustomerVisitUseCase: Symbol.for("IAddCustomerVisitUseCase"),
};

export interface CUSTOMER_VISITS_CARDS_TYPES {
    ICustomerVisitsRepository: ICustomerVisitsRepository;
    IGetCustomerVisitsUseCase: IGetCustomerVisitsUseCase;
    IAddCustomerVisitUseCase: IAddCustomerVisitUseCase;
}
