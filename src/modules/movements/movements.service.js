import mongoose from "mongoose";
import { StockMovementModel } from "../../DB/models/movement.model.js";
import ProductModel from "../../DB/models/products.model.js";

export const increaseStock = async (req, res, next) => {
    let session
    let movement
    try {
        const { productId } = req.params;
        const { quantity, reason } = req.body;

        if (!Number.isSafeInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }

        session = await mongoose.startSession();

        let productNotFound = false;

        await session.withTransaction(async () => {

            const product = await ProductModel.findOneAndUpdate(
                { _id: productId, isDeleted: { $ne: true } },
                { $inc: { stock: quantity } },
                {
                    returnDocument: "before",
                    session
                }
            );

            if (!product) {
                productNotFound = true;
                return;
            }

            const stockBefore = product.stock;
            const stockAfter = stockBefore + quantity;

            const [createdMovement] = await StockMovementModel.create(
                [{
                    productId,
                    type: "IN",
                    quantity,
                    stockBefore,
                    stockAfter,
                    reason,
                    performedBy: req.user.id
                }],
                { session }
            );
            movement = createdMovement;
        });

        if (productNotFound) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        return res.status(201).json({
            message: "Stock Increased Successfully",
            movement
        });

    } catch (error) {
        return next(error);
    } finally {
        if (session) {
            await session.endSession();
        }
    }
};

