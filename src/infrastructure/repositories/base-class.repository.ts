import * as profiles from "../../drizzle/schema/profiles.ts";

import ws from "ws";

import { drizzle, NeonDatabase } from "drizzle-orm/neon-serverless";
import { neonConfig, NeonQueryFunction, Pool } from "@neondatabase/serverless";

export class BaseRepository {
  schema = {
    ...profiles,
    // ...setupQuestions,
    // ...userSetupQuestions,
    // ...modules,
    // ...sections,
    // ...videos,
    // ...finishedVideos,
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
