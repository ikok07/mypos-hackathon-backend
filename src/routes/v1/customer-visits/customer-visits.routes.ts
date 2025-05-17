import { Router } from "express";
import { catchErrors } from "../../../utils/catch-errors";
import { getCustomerVisitsHandler } from "../../../handlers/customer-visits/get-customer-visits.handler";

const customerVisitsRoutes = Router();

customerVisitsRoutes.get("/:userId", catchErrors(getCustomerVisitsHandler));

export default customerVisitsRoutes;