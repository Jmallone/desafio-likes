import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router
    .get("/", userController.getUsers)
    .get("/:id", userController.getUserById)
    .post("/", userController.createUser)
    .put("/:id", userController.editUser)
    .delete("/:id", userController.deleteUser)

export default router;