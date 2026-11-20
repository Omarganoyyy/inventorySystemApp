export const validation = (schema) => async (req, res, next) => {
    try {
        // Validate request components simultaneously
        const parsed = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });

        // Replace request objects with stripped/sanitized data from Zod
        if (parsed.body !== undefined) req.body = parsed.body;
        if (parsed.query !== undefined) {
            // Express 5 exposes query as a getter, so replace the property with
            // the parsed (and possibly transformed) value.
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
        // Return 400 with formatted Zod error issues
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
