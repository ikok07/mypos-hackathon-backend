import { Hono } from "hono";
import { getCustomerVisitsHandler } from "../../../handlers/v1/customer-visits/get-customer-visits.handler.ts";
import { catchErrorsHandler } from "../../../utils/catchErrorsHandler.ts";
import { addCustomerVisitHandler } from "../../../handlers/v1/customer-visits/add-customer-visit.handler.ts";
import { protect } from "../../../middlewares/protect.ts";

const visitsRoutes = new Hono();

visitsRoutes.use(catchErrorsHandler(protect));

visitsRoutes.get(
    "/profile/:userId",
    catchErrorsHandler(getCustomerVisitsHandler)
);
visitsRoutes.post(
    "/profile/:userId",
    catchErrorsHandler(addCustomerVisitHandler)
);

export default visitsRoutes;
