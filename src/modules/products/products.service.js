import ProductModel from "../../DB/models/products.model.js"

export const createProduct = async (req, res, next) => {

    try {
        const { name, description, price, stock, category } = req.body

        const productExists = await ProductModel.findOne({ name })

        if (productExists) {
            return res.status(409).json({ message: "Product With This Name Already Exists" })
        }

        const createdBy = req.user.id

        const newProduct = await ProductModel.create({
            name,
            description,
            price,
            stock,
            category,
            createdBy
        })

        return res.status(201).json({
            message: "product created successfully",
            success: true,
            product: newProduct,
        })

    } catch (error) {
        return next(error)
    }
}

export const listProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, category } = req.query
        const filter = category ? { category: category.toLowerCase() } : {}

        const products = await ProductModel.find(filter)
            .sort({ name: 1 })
            .skip((page - 1) * limit)
            .limit(limit)

        if (!products.length) {
            return res.status(404).json({
                message: "No Listed Products",
                success: false
            });
        }

        return res.status(200).json({
            message: "Products retrieved successfully",
            success: true,
            products
        });
    } catch (error) {
        return next(error);
    }
};


export const productWithId = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const product = await ProductModel.findById(productId).populate("createdBy", "name email");

        if (!product) {
            return res.status(404).json({ message: "No Product Found" });
        }

        return res.status(200).json({
            message: "Done",
            product
        });

    } catch (error) {
        return next(error);
    }
};


export const updateProductWithId = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const updateEntities = req.body;

        const entitesArray = ["name", "description", "note", "price", "category"];

        const keys = Object.keys(updateEntities);

        const isValidOperation = keys.length !== 0 && keys.every((key) => entitesArray.includes(key));

        if (!isValidOperation) {
            return res.status(400).json({
                message: "Available Entities Are name, description, note, price, category"
            });
        }

        const product = await ProductModel.findByIdAndUpdate(
            productId,
            { $set: updateEntities },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        return res.status(200).json({
            message: "Done",
            product
        });
    } catch (error) {
        return next(error);
    }
};


export const deleteProductWithId = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const product = await ProductModel.findOneAndDelete({
            _id: productId,
            isDeleted: true
        });

        if (!product) {
            return res.status(404).json({ message: "Product Not Available" });
        }

        return res.status(200).json({
            message: "Product Deleted Successfully",
            success: true
        });
    } catch (error) {
        return next(error);
    }
};

export const freezeProductWithId = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const product = await ProductModel.findOneAndUpdate(
            { _id: productId, isDeleted: { $ne: true } },
            {
                $set: {
                    isDeleted: true,
                    isAvailable: false,
                    deletedAt: new Date()
                }
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product marked as deleted successfully",
            success: true,
            product
        });
    } catch (error) {
        return next(error);
    }
};
