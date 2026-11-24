export const validation = (schema) => async (req, res, next) => {
    try {
        const parsed = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });

        if (parsed.body !== undefined) req.body = parsed.body;
        if (parsed.query !== undefined) {
            Object.defineProperty(req, "query", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: parsed.query
            });
        }
        if (parsed.params !== undefined) req.params = parsed.params;

        return next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: error.issues?.map((err) => ({
                field: err.path.join("."),
                message: err.message
            })) || error.message
        });
    }
};
