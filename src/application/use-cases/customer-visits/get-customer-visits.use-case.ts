import { ICustomerVisitsRepository } from "../../repositories/customer-visits/customer-visits.repository.interface.ts";

export type IGetCustomerVisitsUseCase = ReturnType<
    typeof getCustomerVisitsUseCase
>;
export const getCustomerVisitsUseCase =
    (customerVisitsRepository: ICustomerVisitsRepository) =>
    (userId: string) => {
        return customerVisitsRepository.getCustomerVisits(userId);
    };
