import { z } from "zod";

export const LoginFormFieldsSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: 'Invalid Email format.' }),
    password: z.string()
        .min(1, { message: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
})

export const RegisterFormFieldsSchema = z.object({
    username: z.string()
        .min(3, { message: 'Username is required' }),
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: 'Invalid Email format.' }),
    password: z.string()
        .min(1, { message: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        })
})