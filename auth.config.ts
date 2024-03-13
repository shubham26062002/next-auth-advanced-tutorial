import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import type { NextAuthConfig } from 'next-auth'
import bcrypt from 'bcryptjs'

import { loginFormSchema } from '@/lib/form-schemas'
import { getUserByEmail } from '@/lib/auth-utils'

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedValues = loginFormSchema.safeParse(credentials)

                if (validatedValues.success) {
                    const { email, password } = validatedValues.data

                    const user = await getUserByEmail(email)

                    if (!user || !user.password) {
                        return null
                    }

                    const isCorrectPassword = await bcrypt.compare(password, user.password)

                    if (!isCorrectPassword) {
                        return null
                    }

                    return user
                }

                return null
            },
        }),
    ],
} satisfies NextAuthConfig