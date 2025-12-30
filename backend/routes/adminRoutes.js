import { Router } from "express";
import { adminLogin, refreshToken, logout } from "../controller/adminController.js";


const routes = Router();

routes.post('/admin_login', adminLogin)
routes.post("/refresh", refreshToken);
routes.post("/logout", logout);

export default routes; 