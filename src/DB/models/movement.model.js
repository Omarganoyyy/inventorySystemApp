import { Schema, model } from "mongoose";

const stockMovementSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true
        },
        type: {
            type: String,
            enum: ["INCREASE", "DECREASE", "ADJUSTMENT"],
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        stockBefore: {
            type: Number,
            required: true
        },
        stockAfter: {
            type: Number,
            required: true
        },
        reason: {
            type: String,
            trim: true,
            default: "Manual update"
        },
        performedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export const StockMovementModel = model("StockMovement", stockMovementSchema);