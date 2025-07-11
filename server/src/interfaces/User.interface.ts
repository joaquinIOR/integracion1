import { ObjectId } from "mongoose"
import { Client } from "./Client.interface"
import { Role } from "./Role.interface"
import { Request } from "express"

export interface UserProject {
    // _id: string | ObjectId; // <-- HEMOS ELIMINADO ESTA LÍNEA
    name: string
    lastName: string
    email: string
    password?: string // Lo hacemos opcional para no enviarlo siempre
    permissions: any
    roles: Role[] | ObjectId[]
    clients: Client[] | ObjectId[]
    image: string
    state: boolean
    deleted: boolean
    phone: string
    user_id: number
    emailVerifiedAt: Date
    createdAt: Date
    updatedAt: Date
}

export interface UserGoogle {
    name: string
    lastName: string
    email: string
    image: string
    fullName: string
    companyDomain: string
    language: string
    sub: string
}

export interface RequestWithUser extends Request {
    user?: UserProject
}
