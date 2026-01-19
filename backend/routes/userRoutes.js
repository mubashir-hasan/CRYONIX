import { Router } from "express";
import { userLogin, userRegister } from "../controller/userController.js";




const routes = Router();

routes.post('/user_login', userLogin);
routes.post('/user_register', userRegister);

export default routes;