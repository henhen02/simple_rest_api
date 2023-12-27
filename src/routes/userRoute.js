import {
    getUsers,
    getUser,
    deleteUser,
    createUser,
    updateUser,
} from "../controllers/userController.js";

import {
    Router
} from "express";
import isAdmin from "../middleware/isAdmin.js";

const userRoutes = Router();

userRoutes.post('/', isAdmin, createUser);
userRoutes.get('/', isAdmin, getUsers);
userRoutes.get('/:id', isAdmin, getUser);
userRoutes.delete('/:id', isAdmin, deleteUser);
userRoutes.put('/:id', isAdmin, updateUser);

export default userRoutes;
