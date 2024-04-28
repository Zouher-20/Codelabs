import { SignJWT, jwtVerify } from 'jose';
const secret = process.env.AUTH_SECRET || '';
const key = new TextEncoder().encode(secret);

export default class AuthUtils {
    static async encryptJwt(value: any) {
        return await new SignJWT(value)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7 days from now')
            .sign(key);
    }

    static async decryptJwt(token: string): Promise<any> {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256']
        });
        return payload;
    }
}
