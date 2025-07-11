import { __ } from "i18n"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HttpException } from "../exceptions/HttpException"
import { languageDefault, secretKey } from "../configs/env"
import { isEmpty } from "@/utils/util"
import userModel from "../models/User.model"
import { UserProject } from "@/interfaces/User.interface"
import { Role } from "@/interfaces/Role.interface"
import { DataStoredInToken, TokenData } from "@/interfaces/Auth.interface"


export const executeLogin = async (email: string, password: string, locale: string = languageDefault!) => {
    if (isEmpty(email || password)) throw new HttpException(400, __({ phrase: 'Credentials are required', locale }))

    // Usamos 'any' temporalmente para que TypeScript no bloquee el acceso a los métodos del modelo
    const findUser: any = await userModel.findOne({ email: email }).populate('roles').populate('clients')
    if (!findUser) {
        console.log(__({ phrase: 'Email {{email}} not found', locale }, { email: email }))
        return {message: __({ phrase: 'Email {{email}} not found', locale }, { email: email }), status: 410,state: false}
    }

    console.log(findUser.roles)
    
    const role: Role = findUser.roles[0] as Role
    if (role.name === 'SuperAdmin') {
        // El método comparePassword existe en el documento que devuelve Mongoose
        const isPasswordMatching: boolean = await findUser.comparePassword(password)
        if (!isPasswordMatching) {
            return {message: __({ phrase: 'Wrong password', locale }), status: 409, state: false}
        }
    
        const token = createToken(findUser, 86400)
        const cookie = createCookie(token)
    
        return { cookie, findUser, token, message: 'login ok', status: 200, state: true }
    } else {
        if (findUser.clients && findUser.clients[0]) {
            const userOrgId: any = findUser.clients[0]
            const isPasswordMatching: boolean = await findUser.comparePassword(password)
            if (!isPasswordMatching) throw new HttpException(409, __({ phrase: 'Wrong password', locale }))
        
            const token = createToken(findUser, 86400)
            const cookie = createCookie(token)
    
        
            return { cookie, findUser, token }
        } else {
            throw new HttpException(410, __({ phrase: 'client not user', locale }, { email: email }))
        }
    }
}

// --- CAMBIO CLAVE AQUÍ ---
// Le decimos a TypeScript que el parámetro 'user' es un objeto que tiene todas
// las propiedades de 'UserProject' Y ADEMÁS una propiedad '_id' de tipo string.
const createToken = (user: UserProject & { _id: string }, expiresIn = 3600) => {
    // Ahora TypeScript sabe que user._id existe y el error desaparece.
    const dataStoredInToken: DataStoredInToken = { _id: user._id }
    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) }
}

export const verifyToken = (token: string, ignoreExpiration = false) => {
    return jwt.verify(token, secretKey, { ignoreExpiration }) as DataStoredInToken
}

const createCookie = (tokenData: TokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
}
