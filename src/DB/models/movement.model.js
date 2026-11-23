import { Schema, model } from "mongoose";

const stockMovementSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true
        },
        productName:{
            type:String,
            required:true
        },
        productSKU:{
            type:String,
            required:true
        },
        type: {
            type: String,
            enum: ["IN", "OUT", "ADJUST"],
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        stockBefore: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative, got {VALUE}']
        },
        stockAfter: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative, got {VALUE}']
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