import * as z from 'zod'

export const loginFormSchema = z.object({
    email: z.string().email({
        message: 'Email is invalid',
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
})