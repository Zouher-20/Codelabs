import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../db/db';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),

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
                    return null;
                }
                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(credentials.password, existingUser.password);

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    email: `${existingUser.email}`,
                    name: `${existingUser.username}`,
                    image: `${existingUser.userImage}`,
                    ROLE: `${existingUser.role}`,
                    typeUser: '${existingUser.typeUser}',
                    planEndDate: '${existingUser.planEndDate}',
                    inActive: '${existingUser.inActive}'
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token };
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user
                }
            };
        }
    }
};
