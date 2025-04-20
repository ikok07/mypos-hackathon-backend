import { Hono } from "hono";
import { catchErrorsHandler } from "../../../utils/catchErrorsHandler.ts";
import { protect } from "../../../middlewares/protect.ts";
import { getProfileBalanceHandler } from "../../../handlers/v1/profile-balances/get-profile-balance.handler.ts";
import { createProfileBalanceHandler } from "../../../handlers/v1/profile-balances/create-profile-balance.handler.ts";
import { updateProfileBalanceHandler } from "../../../handlers/v1/profile-balances/update-profile-balance.handler.ts";

const balancesRoutes = new Hono();

balancesRoutes.use(catchErrorsHandler(protect));

balancesRoutes.get("/:userId", catchErrorsHandler(getProfileBalanceHandler));
balancesRoutes.post(
    "/:userId",
    catchErrorsHandler(createProfileBalanceHandler)
);
balancesRoutes.patch(
    "/:userId",
    catchErrorsHandler(updateProfileBalanceHandler)
);

export default balancesRoutes;
