import { Hono } from "hono";
import { catchErrorsHandler } from "../../../../utils/catchErrorsHandler.ts";
import { getCurrentProfileBalanceHandler } from "../../../../handlers/v1/profile/get-current-profile-balance.handler.ts";

const currentProfileBalanceRoutes = new Hono();

currentProfileBalanceRoutes.get(
    "/",
    catchErrorsHandler(getCurrentProfileBalanceHandler)
);

export default currentProfileBalanceRoutes;
