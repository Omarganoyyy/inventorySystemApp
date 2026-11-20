import { z } from "zod";

// MongoDB ObjectId validation helper
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

// 1. Validation for createProduct
export const createProductSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Product name is required" }).trim().min(2, "Name must be at least 2 characters"),
        description: z.string().trim().optional(),
        price: z.number({ required_error: "Price is required" }).positive("Price must be greater than 0"),
        stock: z.number({ required_error: "Stock is required" }).int("Stock must be an integer").nonnegative("Stock cannot be negative"),
        category: z.string({ required_error: "Category is required" }).trim().min(1, "Category cannot be empty")
    })
});

const paginationQuery = {
    page: z.string().regex(/^[1-9]\d*$/, "Page must be a positive integer").optional().transform((val) => val ? Number(val) : 1).pipe(z.number().safe().int()),
    limit: z.string().regex(/^[1-9]\d*$/, "Limit must be a positive integer").optional().transform((val) => val ? Number(val) : 10).pipe(z.number().int().max(100, "Limit cannot exceed 100"))
};

// 2. Validation for listProducts (Supports pagination and category filtering)
export const listProductsSchema = z.object({
    query: z.object({
        ...paginationQuery,
        category: z.string().trim().min(1, "Category cannot be empty").optional()
    }).strict().default({})
});

// 3. Validation for productWithId
export const productWithIdSchema = z.object({
    params: z.object({
        productId: objectIdSchema
    })
});

// 4. Validation for updateProductWithId
export const updateProductWithIdSchema = z.object({
    params: z.object({
        productId: objectIdSchema
    }),
    body: z.object({
        name: z.string().trim().min(2).optional(),
        description: z.string().trim().optional(),
        note: z.string().trim().optional(),
        price: z.number().positive().optional(),
        category: z.string().trim().min(1).optional()
    }).strict({ message: "Available entities to update are: name, description, note, price, category" })
      .refine((data) => Object.keys(data).length > 0, {
          message: "At least one field must be provided to update"
      })
});

// 5. Validation for deleteProductWithId
export const deleteProductWithIdSchema = z.object({
    params: z.object({
        productId: objectIdSchema
    })
});
