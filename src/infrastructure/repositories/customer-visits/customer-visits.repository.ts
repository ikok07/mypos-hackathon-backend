import { ICustomerVisitsRepository } from "../../../application/repositories/customer-visits/customer-visits.repository.interface.ts";
import {
    CustomerVisits,
    CustomerVisitsInsert,
    customerVisitsTable,
} from "../../../drizzle/schema/customer_visits.ts";
import { DatabaseError } from "../../../entities/models/errors/db/database.ts";
import { NotFoundError } from "../../../entities/models/errors/NotFoundError.ts";
import { BaseRepository } from "../base-class.repository.ts";
import { eq } from "drizzle-orm";

export class CustomerVisitsRepository
    extends BaseRepository
    implements ICustomerVisitsRepository
{
    async getCustomerVisits(userId: string): Promise<CustomerVisits[]> {
        try {
            const data = await this.queryDB((db) => {
                return db.query.customerVisitsTable.findMany({
                    where: eq(customerVisitsTable.profile_id, userId),
                });
            });

            if (!data)
                throw new NotFoundError(
                    "Customer visits for this userId could not be found!"
                );

            return data;
        } catch (e) {
            if (e instanceof NotFoundError) throw e;
            throw new DatabaseError(`Could not get customer visits: ${e}`);
        }
    }

    async addCustomerVisit(data: CustomerVisitsInsert): Promise<void> {
        try {
            await this.queryDB((db) => {
                return db.insert(customerVisitsTable).values(data);
            });
        } catch (e) {
            if (e instanceof NotFoundError) throw e;
            throw new DatabaseError(`Could not add customer visits: ${e}`);
        }
    }
}
