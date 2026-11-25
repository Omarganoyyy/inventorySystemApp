import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { connectDB } from './DB/DB.connection.js'
import authRouter from './modules/auth/auth.controller.js'
import productsController from './modules/products/products.controller.js'
import movementsController from './modules/movements/movements.controller.js'
import { limiter } from './security/limiter.js'

const app = express()
const port = Number(process.env.PORT || 3000)

export const bootstrap = async () => {

    app.use(helmet())
    app.use(cors())
    app.use(express.json())

    app.use(limiter)

    await connectDB()

    app.use('/auth', authRouter)
    app.use('/products', productsController)
    app.use('/movements', movementsController)

    app.use((error, req, res, next) => {
        const statusCode = typeof error.cause === 'number' ? error.cause : (error.status || 500);

        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal Server Error",
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        });
    });

    app.listen(port, () => {
        console.log(`App Is Listening On Port ${port}`)
    })
}
