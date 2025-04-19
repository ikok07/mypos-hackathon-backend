import {
    CheckResourceOptions,
    CheckUserAccessOptions,
    DecisionResults,
    IAuthorizationService,
} from "../../../application/repositories/auth/authorization.service.interface.ts";
import { AuthorizationError } from "../../../entities/models/errors/auth/AuthorizationError.ts";

import { AutoUpdatingLoader, Embedded } from "@cerbos/embedded";

export class CerbosService implements IAuthorizationService {
    cerbos = new Embedded(
        new AutoUpdatingLoader(Deno.env.get("CERBOS_HUB_EMBEDDED_POLICY_URL")!)
    );

    hasAccess(opts: CheckUserAccessOptions): Promise<boolean> {
        try {
            return this.cerbos.isAllowed(opts);
        } catch (e) {
            console.error(e);
            throw new AuthorizationError(
                `Failed to check if user has access to resource! ${e}`
            );
        }
    }

    async checkResources(opts: CheckResourceOptions): Promise<DecisionResults> {
        try {
            const decision = await this.cerbos.checkResources(opts);
            const results: DecisionResults = [];

            for (const result of decision.results) {
                results.push({
                    resourceId: result.resource.id,
                    actions: result.actions,
                });
            }

            return results;
        } catch (e) {
            console.error(e);
            throw new AuthorizationError(
                `Failed to check if user has access to resources! ${e}`
            );
        }
    }
}
