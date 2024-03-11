import * as z from 'zod'

export const loginFormSchema = z.object({
    email: z.string().email({
        message: 'Email is invalid',
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
})

export const registerFormSchema = z.object({
    name: z.string().refine((value) => value.trim() !== '', {
        message: 'Name is required',
    }),
    email: z.string().email({
        message: 'Email is invalid',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long',
    }),
})