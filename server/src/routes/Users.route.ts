import { getAllUsers, newUser } from '../controllers/Users.controller'
import {Router} from 'express'

const router = Router()

router.get('/getAllUsers', getAllUsers)
router.post('/newUser', newUser)

export default router