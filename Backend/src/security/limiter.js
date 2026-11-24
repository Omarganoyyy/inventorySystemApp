import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 50, // Limit each IP to 50 requests per 10 minutes
    standardHeaders: "draft-8", // Combined RateLimit header
    legacyHeaders: false, // Disable X-RateLimit-* headers
    ipv6Subnet: 56, // IPv6 subnet aggregation
    message: {
        status: "error",
        message: "Too many requests from this IP, please try again after 10 minutes."
    }
})