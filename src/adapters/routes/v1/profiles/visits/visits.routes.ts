import { Hono } from "hono";
import { catchErrorsHandler } from "../../../../utils/catchErrorsHandler.ts";
import { getCustomerVisitsHandler } from "../../../../handlers/v1/profiles/customer-visits/get-customer-visits.handler.ts";
import { addCustomerVisitHandler } from "../../../../handlers/v1/profiles/customer-visits/add-customer-visit.handler.ts";

const visitsRoutes = new Hono();

visitsRoutes.get("/", catchErrorsHandler(getCustomerVisitsHandler));
visitsRoutes.post("/", catchErrorsHandler(addCustomerVisitHandler));

export default visitsRoutes;
