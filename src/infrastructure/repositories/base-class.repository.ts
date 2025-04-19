import * as profiles from "../../drizzle/schema/profiles.ts";
import * as loyaltyCards from "../../drizzle/schema/loyalty_cards.ts";
import * as customerVisits from "../../drizzle/schema/customer_visits.ts";

import ws from "ws";

import { drizzle, NeonDatabase } from "drizzle-orm/neon-serverless";
import { neonConfig, NeonQueryFunction, Pool } from "@neondatabase/serverless";

export class BaseRepository {
    schema = {
        ...profiles,
        ...loyaltyCards,
        ...customerVisits,
    };

    protected queryDB<T>(
        callback: (
            db: Omit<
                NeonDatabase<typeof this.schema> & {
                    $client: NeonQueryFunction<false, false>;
                },
                "_" | "$withAuth" | "batch" | "$with" | "$client"
            >
        ) => Promise<T>
    ) {
        neonConfig.webSocketConstructor = ws;
        neonConfig.poolQueryViaFetch = true;

        const pool = new Pool({ connectionString: Deno.env.get("DB_URL")! });

        const db = drizzle(pool, {
            schema: this.schema,
        });

        return callback(db);
    }
}
