import { Router } from "express";
import { adminLogin, refreshToken, logout, getAllUsers } from "../controller/adminController.js";


const routes = Router();

routes.post('/admin_login', adminLogin)
routes.post("/refresh", refreshToken);
routes.post("/logout", logout);

routes.get('/get_all_users', getAllUsers);

export default routes; 