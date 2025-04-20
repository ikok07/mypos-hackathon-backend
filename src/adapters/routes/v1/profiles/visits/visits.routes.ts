import { Hono } from "hono";
import { catchErrorsHandler } from "../../../../utils/catchErrorsHandler.ts";
import { getCurrentVisitsHandler } from "../../../../handlers/v1/profile/get-current-visits.handler.ts";

const currentProfileVisitsRoutes = new Hono();

currentProfileVisitsRoutes.get(
    "/",
    catchErrorsHandler(getCurrentVisitsHandler)
);

export default currentProfileVisitsRoutes;
