import { Router } from "express";
import * as movementsService from './movements.service.js'
import { authentication } from "../../middlewares/authentication.middleware.js";
const router = Router()

router.post('/stock/increase/:productId',authentication,movementsService.increaseStock)

export default router