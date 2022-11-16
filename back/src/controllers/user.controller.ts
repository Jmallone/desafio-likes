import { Request, Response } from "express";
import { AppError } from "../exceptions";
import userService from "../services/user.service";
import { omit } from 'lodash'

const getUsers = async(_req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json({ success: true, details: users });

    } catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json({ success: true, details: user });
    }
    catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json({ success: true, details: omit(user, 'password', 'id') });
    } catch (err: any) {
        AppError.handleError(err, req, res)
    }
}

const editUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.editUser(req.params.id, req.body);
        res.status(200).json({ success: true, details: user });
    }
    catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json({ success: true, details: user });
    } catch (err: any) {
        res.status(400).json({ success: false, details: err.message });
    }

}

const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.loginUser(req.body);
        res.status(200).json({ success: true, details: user });
    } catch (err: any) {
        AppError.handleError(err, req, res)
    }
}

const logoutUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.logoutUser(req.body);
        res.status(200).json({ success: true, details: user });
    } catch (err: any) {
        AppError.handleError(err, req, res)
    }
}

export default { getUsers,getUserById, createUser, editUser, deleteUser, loginUser, logoutUser };