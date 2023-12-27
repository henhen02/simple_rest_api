import {
    updateProfile
} from "../controllers/profileController.js";
import { Router } from "express";
import jwtVerify from "../middleware/jwtVerify.js";

const profileRoute = Router();

profileRoute.put('/',jwtVerify, updateProfile);

export default profileRoute;