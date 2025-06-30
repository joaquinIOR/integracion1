import { getItems, postItem, putItem, putPrice} from "@/controllers/Item.controller";
import { Router } from "express";

const router = Router()

router.post('/', postItem)
router.get('/', getItems)
router.put('/', putItem)
router.put('/price', putPrice)


export default router