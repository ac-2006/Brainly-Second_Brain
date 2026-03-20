import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string()
        .min(8)
        .max(32)
        .regex(/[A-Z]/)
        .regex(/[a-z]/)
        .regex(/[0-9]/)
        .regex(/[\W_]/)
});