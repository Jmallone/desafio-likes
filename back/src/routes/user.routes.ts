import express from 'express';
import userController from '../controllers/user.controller';

import { checkToken, is } from '../config/safeRoutes';

const router = express.Router();

router
    .get("/",checkToken, is('admin'), userController.getUsers)
    .get("/:id",checkToken, is('admin'), userController.getUserById)
    .post("/", userController.createUser)
    .post("/login", userController.loginUser)
    .post("/logout", checkToken, userController.logoutUser)
    .put("/:id",checkToken, is('admin'), userController.editUser)
    .delete("/:id",checkToken, is('admin'), userController.deleteUser)

export default router;