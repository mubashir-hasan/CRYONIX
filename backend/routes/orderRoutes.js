import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getAllOrders } from "../controller/orderController.js";

const routes = Router();

routes.get("/orders", verifyToken, getAllOrders);

export default routes;