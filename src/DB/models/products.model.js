import { Schema, model } from "mongoose";
import CounterModel from "./counter.model.js";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: [2, "Product name must be at least 2 characters long"],
            maxlength: [100, "Product name cannot exceed 100 characters"]
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"]
        },
        SKU: {
            type: String,
            unique: true,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        },
        stock: {
            type: Number,
            required: [true, "Stock count is required"],
            min: [0, "Stock cannot be negative"],
            default: 0
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            lowercase: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },

    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

productSchema.index({ category: 1, price: 1 });

productSchema.virtual("stockWarning").get(function () {
    if (this.stock < 10) {
        return `Low stock warning: only ${this.stock} remaining!`;
    }
    return null;
});

productSchema.pre("save", async function (next) {
    if (this.isNew) {
        const counter = await CounterModel.findOneAndUpdate(
            { _id: "product" },
            { $inc: { sequence: 1 } },
            {
                upsert: true,
                returnDocument: "after"
            }
        );

        this.SKU = `PRD-${String(counter.sequence).padStart(6, "0")}`;
    }
})

const ProductModel = model("Product", productSchema);

export default ProductModel;
