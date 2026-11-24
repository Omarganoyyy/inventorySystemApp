import { StockMovementModel } from "../../DB/models/movement.model.js";
import ProductModel from "../../DB/models/products.model.js";

export const increaseStock = async (req, res, next) => {
    let movement
    try {
        const { productId } = req.params;
        const { quantity, reason } = req.body;

        if (!Number.isSafeInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            });
        }

        const product = await ProductModel.findOneAndUpdate(
            { _id: productId, isDeleted: { $ne: true } },
            { $inc: { stock: quantity } },
            { returnDocument: "before" }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        try {
            movement = await StockMovementModel.create({
                productId,
                productName: product.name,
                productSKU: product.SKU,
                type: "IN",
                quantity,
                stockBefore: product.stock,
                stockAfter: product.stock + quantity,
                reason,
                performedBy: req.user.id
            });
        } catch (error) {
            throw error;
        }

        return res.status(201).json({
            message: "Stock Increased Successfully",
            movement
        });

    } catch (error) {
        return next(error);
    }
};

export const decreaseStock = async (req, res, next) => {
    try {
        const { productId } = req.params

        const { quantity, reason } = req.body

        if (quantity <= 0) {
            res.status(400).json({ message: "Quantity must be a positive integer" })
        }


        const product = await ProductModel.findOneAndUpdate(
            { _id: productId, isDeleted: { $ne: true }, stock: { $gte: quantity } },
            { $inc: { stock: -quantity } }
        )

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        const movement = await StockMovementModel.create(
            {
                productId,
                productName: product.name,
                productSKU: product.SKU,
                type: "OUT",
                quantity,
                stockBefore: product.stock,
                stockAfter: product.stock - quantity,
                reason,
                performedBy: req.user.id
            })

        return res.status(201).json({
            message: "Stock Decreased Successfully",
            movement
        });

    } catch (error) {
        return next(error)
    }
}

export const getMovements = async (req, res, next) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        const type = req.body?.type ? req.body.type.toUpperCase() : "ALL";

        const typeArray = ["IN", "OUT", "ADJUST", "ALL"];

        if (!typeArray.includes(type)) {
            return res.status(400).json({ message: "type can only be IN, OUT, ADJUST, ALL" });
        }

        const filter = {};
        if (type !== "ALL") {
            filter.type = type;
        }

        const movements = await StockMovementModel.find(filter)
            .sort({ createdAt: 1 })
            .skip((pageNumber - 1) * 5)
            .limit(5);

        return res.status(200).json({
            message: "Done",
            movements
        });

    } catch (error) {
        return next(error);
    }
};