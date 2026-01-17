import { Router } from "express";
import { getAllUsers, userLogin, userRegister } from "../controller/userController.js";




const routes = Router();

routes.post('/user_login', userLogin);
routes.post('/user_register', userRegister);
routes.get('/get_all_users', getAllUsers);

export default routes;