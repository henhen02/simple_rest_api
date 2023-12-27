import { login, logout, register } from "../controllers/authController.js";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/logout', logout);

export default authRoutes;