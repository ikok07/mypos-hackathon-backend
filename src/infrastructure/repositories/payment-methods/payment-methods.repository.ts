import { eq } from "drizzle-orm";
import { IPaymentMethodsRepository } from "../../../application/repositories/payment-methods/payment-methods.repository.interface.ts";
import {
    PaymentMethods,
    PaymentMethodsInsert,
    paymentMethodsTable,
} from "../../../drizzle/schema/payment_methods.ts";
import { DatabaseError } from "../../../entities/models/errors/db/database.ts";
import { NotFoundError } from "../../../entities/models/errors/NotFoundError.ts";
import { BaseRepository } from "../base-class.repository.ts";

export class PaymentMethodsRepository
    extends BaseRepository
    implements IPaymentMethodsRepository
{
    getPaymentMethods(): Promise<PaymentMethods[]> {
        try {
            return this.queryDB((db) => {
                return db.query.paymentMethodsTable.findMany();
            });
        } catch (e) {
            if (e instanceof NotFoundError) throw e;
            throw new DatabaseError(`Failed to get payment methods: ${e}`);
        }
    }
    addPaymentMethod(data: PaymentMethodsInsert): Promise<PaymentMethods[]> {
        try {
            return this.queryDB((db) => {
                return db
                    .insert(paymentMethodsTable)
                    .values(data)
                    .returning()
                    .execute();
            });
        } catch (e) {
            throw new DatabaseError(`Failed to add payment method: ${e}`);
        }
    }
    async removePaymentMethod(
        paymentMethodId: string
    ): Promise<PaymentMethods> {
        try {
            return await this.queryDB(async (db) => {
                const result = await db
                    .delete(paymentMethodsTable)
                    .where(eq(paymentMethodsTable.id, paymentMethodId))
                    .returning();

                if (!result || !result[0])
                    throw new NotFoundError("Payment method wasn't found!");

                return result[0];
            });
        } catch (e) {
            if (e instanceof NotFoundError) throw e;
            throw new DatabaseError(`Failed to remove payment method: ${e}`);
        }
    }
}
