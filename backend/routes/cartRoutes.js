import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { addToCart, getCartItems } from "../controller/cartController.js";

const routes = Router();

routes.post('/addtocart', verifyToken, addToCart);
routes.get('/cartproducts', verifyToken, getCartItems)

export default routes;