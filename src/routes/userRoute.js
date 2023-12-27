import {
    getUsers,
    getUser,
    deleteUser,
    createUser
} from "../controllers/userController.js";

import {
    Router
} from "express";
import jwtVerify from "../middleware/jwtVerify.js";
import permission from "../middleware/permission.js";

const userRoutes = Router();

userRoutes.post('/', jwtVerify, permission, createUser);
userRoutes.get('/', jwtVerify, permission, getUsers);
userRoutes.get('/:id', jwtVerify, permission, getUser);
userRoutes.delete('/:id', jwtVerify, permission, deleteUser);

export default userRoutes;
