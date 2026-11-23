import jwt from 'jsonwebtoken'

export const authentication = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ message: "Authorization header is required" })
        }

        const [header, token] = authorization.split(" ")

        if (!header || !token || header !== "Bearer") {
            return res.status(401).json({ message: "Invalid or missing token parts" })
        }

        const user = jwt.verify(token, process.env.JWT_SECRET)

        req.user = user

        next()
    } catch (error) {
        return next(error)
    }
}