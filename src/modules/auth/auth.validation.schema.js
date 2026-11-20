import { z } from "zod";

// MongoDB ObjectId validation helper
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID format");
const paginationQuery = {
    page: z.string().regex(/^[1-9]\d*$/, "Page must be a positive integer").optional().transform((val) => val ? Number(val) : 1).pipe(z.number().safe().int()),
    limit: z.string().regex(/^[1-9]\d*$/, "Limit must be a positive integer").optional().transform((val) => val ? Number(val) : 10).pipe(z.number().int().max(100, "Limit cannot exceed 100"))
};

// 1. Validation for signup
export const signupSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).trim().min(2, "Name must be at least 2 characters"),
        email: z.string({ required_error: "Email is required" }).trim().email("Invalid email address").toLowerCase(),
        password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters long")
    })
});

// 2. Validation for login
export const loginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }).trim().email("Invalid email address").toLowerCase(),
        password: z.string({ required_error: "Password is required" }).min(1, "Password cannot be empty")
    })
});

// 3. Validation for profile (No params/body needed, user ID extracted from JWT req.user)
export const profileSchema = z.object({});

// 4. Validation for getPendingUsers (Supports optional pagination query params)
export const getPendingUsersSchema = z.object({
    query: z.object({
        ...paginationQuery
    }).strict().default({})
});

// 5. Validation for approveUser
export const approveUserSchema = z.object({
    params: z.object({
        userId: objectIdSchema
    })
});

// 6. Validation for rejectUser
export const rejectUserSchema = z.object({
    params: z.object({
        userId: objectIdSchema
    })
});
