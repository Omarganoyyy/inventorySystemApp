import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"]
        },
        role: {
            type: String,
            enum: ["staff", "admin"],
            default: "staff"
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending" // Default state for public registration
        },
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        approvedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        versionKey: false // Removes the default __v mongoose version field
    }
);

const UserModel = model("User", userSchema);

export default UserModel;