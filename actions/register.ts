'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { registerFormSchema } from '@/lib/form-schemas'
import { prisma } from '@/lib/prisma'
import { getUserByEmail } from '@/lib/auth-utils'

export const register = async (values: z.infer<typeof registerFormSchema>) => {
    const validatedValues = registerFormSchema.safeParse(values)

    if (!validatedValues.success) {
        return {
            error: 'Values are not valid',
        }
    }

    const { name, email, password } = validatedValues.data

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {
            error: 'Email is already taken',
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    // TODO: Send verification token to user's email

    return {
        success: 'Registered successfully!',
    }
}