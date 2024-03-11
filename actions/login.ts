'use server'

import * as z from 'zod'

import { loginFormSchema } from '@/lib/form-schemas'

export const login = async (values: z.infer<typeof loginFormSchema>) => {
    const validatedValues = loginFormSchema.safeParse(values)

    if (!validatedValues.success) {
        return {
            error: 'Values are not valid',
        }
    }

    return {
        success: 'Logged in successfully!',
    }
}