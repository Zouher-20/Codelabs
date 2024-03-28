import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../db/db';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    pages: {
        signIn: '../../../(features)/(auth)/login/page.tsx'
    },
    secret: 'sadasdasdmK$$lw3mlas',
    session: { strategy: 'jwt' },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: '*****@gmail.com' },
                password: { label: 'Password', type: 'password', placeholder: '**********' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw 'email or password error ';
                }
                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email }
                });

                if (!existingUser) {
                    throw 'email not found';
                }

                const passwordMatch = await compare(credentials.password, existingUser.password);

                if (!passwordMatch) {
                    throw 'password is not match';
                }

                return {
                    id: `${existingUser.id}`,
                    email: `${existingUser.email}`,
                    name: `${existingUser.username}`,
                    image: `${existingUser.userImage}`,
                    role: `${existingUser.role}`,
                    typeUser: existingUser.typeUser
                    // planEndDate: '${existingUser.planEndDate}',
                    // inActive: '${existingUser.inActive}'
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, typeUser: user.typeUser, role: user.role };
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    typeUser: token.typeUser,
                    role: token.role
                }
            };
        }
    }
};
