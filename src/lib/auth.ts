
import GoogleProvider from "next-auth/providers/google"
import { mergeAnonCartIntoUser } from '@/lib/db/cart'
import prisma from '@/lib/db/prisma'
import { env } from '@/lib/env'
import { PrismaAdapter } from '@auth/prisma-adapter'
import {NextAuthOptions} from 'next-auth'
import { Adapter } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        session({ session, user}){
            session.user.id = user.id;
            return session;
        }
    },
    events: {
       async signIn({user}){
            await mergeAnonCartIntoUser(user.id)
        }
    }
}