import NextAuth from 'next-auth';
import { authOptions } from '../../../../core/manager/auth-options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
