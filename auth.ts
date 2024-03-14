import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'

import { getUserById } from '@/lib/auth-utils'
import authConfig from '@/auth.config'
import { prisma } from '@/lib/prisma'

declare module 'next-auth' {
    interface User {
        role: UserRole,
    }
}

export const {
    handlers: {
        GET,
        POST,
    },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        // async signIn({ user }) {
        //     if (!user || !user.id) {
        //         return false
        //     }

        //     const existingUser = await getUserById(user.id)

        //     if (!existingUser || !existingUser.emailVerified) {
        //         return false
        //     }

        //     return true
        // },
        async session({
            token,
            session,
        }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }

            if (session.user && token.role) {
                session.user.role = token.role as UserRole
            }

            return session
        },
        async jwt({
            token,
        }) {
            if (!token.sub) {
                return token
            }

            const user = await getUserById(token.sub)

            token.role = user?.role

            return token
        }
    },
    ...authConfig,
})