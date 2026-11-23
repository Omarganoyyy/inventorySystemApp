import { Router } from "express";
import * as movementsService from './movements.service.js'
import { authentication } from "../../middlewares/authentication.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
const router = Router()

router.post('/stock/increase/:productId',authentication,movementsService.increaseStock)
router.post('/stock/decrease/:productId',authentication,movementsService.decreaseStock)
router.get('/stock/adjust/:productId',authentication,authorization(["admin"]),movementsService.getMovements)

export default router