import { createModule } from "@evyweb/ioctopus";
import { DI_SYMBOLS } from "../types.ts";
import { CustomerVisitsRepository } from "../../infrastructure/repositories/customer-visits/customer-visits.repository.ts";
import { getCustomerVisitsUseCase } from "../../application/use-cases/customer-visits/get-customer-visits.use-case.ts";
import { addCustomerVisitUseCase } from "../../application/use-cases/customer-visits/add-customer-visit.use-case.ts";

export function createCustomerVisitsModule() {
    const customerVisitsModule = createModule();

    customerVisitsModule
        .bind(DI_SYMBOLS.ICustomerVisitsRepository)
        .toClass(CustomerVisitsRepository);

    customerVisitsModule
        .bind(DI_SYMBOLS.IGetCustomerVisitsUseCase)
        .toHigherOrderFunction(getCustomerVisitsUseCase, [
            DI_SYMBOLS.ICustomerVisitsRepository,
        ]);

    customerVisitsModule
        .bind(DI_SYMBOLS.IAddCustomerVisitUseCase)
        .toHigherOrderFunction(addCustomerVisitUseCase, [
            DI_SYMBOLS.ICustomerVisitsRepository,
        ]);

    return customerVisitsModule;
}
