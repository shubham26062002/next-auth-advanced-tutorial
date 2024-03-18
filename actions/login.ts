'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { loginFormSchema } from '@/lib/form-schemas'
import { defaultLoginRedirect } from '@/routes'

export const login = async (values: z.infer<typeof loginFormSchema>) => {
    const validatedValues = loginFormSchema.safeParse(values)

    if (!validatedValues.success) {
        return {
            error: 'Values are not valid',
        }
    }

    const { email, password } = validatedValues.data

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: defaultLoginRedirect,
        })

        return {
            success: 'Logged in successfully!',
        }
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                return {
                    error: 'Invalid email/password combination',
                }
            } else {
                return {
                    error: 'Something went wrong',
                }
            }
        }

        throw error
    }
}