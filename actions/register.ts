'use server'

import * as z from 'zod'

import { registerFormSchema } from '@/lib/form-schemas'

export const register = async (values: z.infer<typeof registerFormSchema>) => {
    const validatedValues = registerFormSchema.safeParse(values)

    if (!validatedValues.success) {
        return {
            error: 'Values are not valid',
        }
    }

    return {
        success: 'Registered successfully!',
    }
}