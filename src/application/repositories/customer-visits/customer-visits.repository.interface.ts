import {
    CustomerVisits,
    CustomerVisitsInsert,
} from "../../../drizzle/schema/customer_visits.ts";

export interface ICustomerVisitsRepository {
    getCustomerVisits(userId: string): Promise<CustomerVisits[]>;
    addCustomerVisit(data: CustomerVisitsInsert): Promise<void>;
}
