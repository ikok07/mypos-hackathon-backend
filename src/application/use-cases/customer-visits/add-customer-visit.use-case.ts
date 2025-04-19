import { CustomerVisitsInsert } from "../../../drizzle/schema/customer_visits.ts";
import { ICustomerVisitsRepository } from "../../repositories/customer-visits/customer-visits.repository.interface.ts";

export type IAddCustomerVisitUseCase = ReturnType<
    typeof addCustomerVisitUseCase
>;
export const addCustomerVisitUseCase =
    (customerVisitsRepository: ICustomerVisitsRepository) =>
    (data: CustomerVisitsInsert) => {
        return customerVisitsRepository.addCustomerVisit(data);
    };
