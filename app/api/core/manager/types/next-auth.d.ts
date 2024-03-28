import 'next-auth';

declare module 'next-auth' {
    interface User {
        typeUser: string?;
        role: ROLE?;
    }

    interface Session {
        user: User & {
            typeUser: string?;
            role: ROLE?;
        };
        token: {
            typeUser: string?;
            role: ROLE?;
        };
    }
}
