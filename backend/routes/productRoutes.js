import { Router } from "express";
import { addProducts, getAllProducts, updateImage, getSingleProduct, newProducts } from "../controller/productController.js";
import verifyToken from "../middleware/verifyToken.js";
import { uploadImage } from "../middleware/uploadProductImage.js";



const routes = Router();

routes.get('/', getAllProducts);
routes.get('/new_products', newProducts);
routes.post('/add_product', verifyToken , addProducts);
routes.post('/addImage',verifyToken, uploadImage.single('productImage'), updateImage);
routes.get("/product/:id", getSingleProduct);


export default routes;