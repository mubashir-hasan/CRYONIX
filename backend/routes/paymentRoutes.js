import { Router } from "express";
import { chargePayment } from "../controller/paymentController.js";

const routes = Router();

routes.post('/charge-payment', chargePayment)

export default routes;