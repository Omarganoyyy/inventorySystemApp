import { Router } from "express";
import * as movementsService from './movements.service.js'
import { authentication } from "../../middlewares/authentication.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { limiter } from "../../security/limiter.js";
const router = Router()

router.post('/stock/increase/:productId', authentication, limiter, movementsService.increaseStock)
router.post('/stock/decrease/:productId', authentication, limiter, movementsService.decreaseStock)
router.get('/stock/adjust/:productId', authentication, authorization(["admin"]), limiter, movementsService.getMovements)

export default router