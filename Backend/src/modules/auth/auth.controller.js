import { Router } from "express";
const router = Router()
import * as authService from './auth.service.js'
import { authentication } from "../../middlewares/authentication.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { approveUserSchema, getPendingUsersSchema, loginSchema, rejectUserSchema, signupSchema } from "./auth.validation.schema.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { limiter } from "../../security/limiter.js";

router.post('/signup',limiter,validation(signupSchema),authService.signup)
router.post('/login',limiter,validation(loginSchema),authService.login)
router.get('/profile',authentication,limiter,authService.profile)
router.get('/pendingUsers',authentication,authorization(["admin"]),limiter,validation(getPendingUsersSchema),authService.getPendingUsers)
router.patch('/approveUser/:userId',authentication,authorization(["admin"]),limiter,validation(approveUserSchema),authService.approveUser)
router.patch('/rejectUser/:userId',authentication,authorization(["admin"]),limiter,validation(rejectUserSchema),authService.rejectUser)

export default router
