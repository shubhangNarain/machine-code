import { badRequest } from "../utils/response";

/**
 * @param {import("zod").ZodSchema} schema
 * @param {"body" | "cookies" | "headers" | "params" | "query"} source
 */

export const validate = (schema, source = "body") => (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
        const errors = result.error.errors.map((e) => {
            return {
                field: e.path.join('.'),
                message: e.message,
            }
        });
        return badRequest(res, errors);
    }
    // request with parsed data
    req.validated = result.data;
    next();
}