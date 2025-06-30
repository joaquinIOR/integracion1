import { findAllUsers, createUser } from "../services/Users.services";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await findAllUsers()
    res.status(200).json({state: true, users})
}

export const newUser = async (req: Request, res: Response) => {
    const {userData} = req.body
    const newUser = await createUser(userData)
    res.status(200).json({state: true, newUser})
}