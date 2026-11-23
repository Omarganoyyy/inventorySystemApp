import jwt from "jsonwebtoken"
import UserModel from "../../DB/models/user.model.js"
import { compareHash, hashPasswrod } from "../../security/hash.security.js"

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }

        const hashingPassword = await hashPasswrod(password)

        const newUser = await UserModel.create({
            name,
            email,
            password: hashingPassword,
            role: "staff"
        })

        return res.status(201).json({
            message: "Registration submitted successfully. Awaiting admin approval.",
            success: true
        })

    } catch (error) {
        return next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        if (user.role !== "admin") {
            if (user.status === "pending") {
                return res.status(403).json({
                    message: "Your account is pending admin approval."
                });
            }

            if (user.status === "rejected") {
                return res.status(403).json({
                    message: "Your registration request has been rejected."
                });
            }
        }


        const comparingHashedPassword = await compareHash(password, user.password)

        if (!comparingHashedPassword) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "fallbackSecretKey",
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Successful Login",
            success: true,
            token
        })

    } catch (error) {
        return next(error)
    }
}

export const profile = async (req, res, next) => {

    try {
        const userId = req.user.id

        const user = await UserModel.findById(userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Profile retrieved successfully",
            success: true,
            user
        });
    } catch (error) {
        return next(error)
    }
}

export const getPendingUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pendingUsers = await UserModel.find({ status: "pending" })
            .select("-password")
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({ success: true, pendingUsers });
    } catch (error) {
        return next(error);
    }
};

export const approveUser = async (req, res, next) => {
    try {
        const { userId } = req.params

        const user = await UserModel.findByIdAndUpdate(userId, {
            status: "approved",
            approvedBy: req.user.id,
            approvedAt: new Date()
        },
            { returnDocument: "after" })

        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        return res.status(200).json({
            success: true,
            message: "User registration Approved"
        });
    } catch (error) {
        return next(error)
    }
}

export const rejectUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { status: "rejected" },
            { returnDocument: "after" }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User registration rejected"
        });
    } catch (error) {
        return next(error);
    }
};
