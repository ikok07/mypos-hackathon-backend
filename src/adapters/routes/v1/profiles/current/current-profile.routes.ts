import { Hono } from "hono";
import { catchErrorsHandler } from "../../../../utils/catchErrorsHandler.ts";
import { getCurrentProfileByIdHandler } from "../../../../handlers/v1/profiles/current/get-current-profile-by-id.handler.ts";
import { getCurrentLoyaltyCardHandler } from "../../../../handlers/v1/profiles/current/get-current-loyalty-card.handler.ts";

const currentProfileRoutes = new Hono();

currentProfileRoutes.get(
    "/current",
    catchErrorsHandler(getCurrentProfileByIdHandler)
);
currentProfileRoutes.get(
    "/current/loyalty-card",
    catchErrorsHandler(getCurrentLoyaltyCardHandler)
);

export default currentProfileRoutes;
