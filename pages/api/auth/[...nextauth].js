import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            checks: "state"
        })
    ],
    jwt: {
        encode: async ({secret, token}) => {
            const jwtClaims = {
                "sub": token.id,
                "name":token.name,
                "email":token.email,
                "iat":Date.now() / 1000,
                "exp": Math.floor(Date.now()/1000) + (24*60*60),
                "https://harusa.io/jwt/claims": {
                    "x-harusa-allowed-roles": ["user"],
                    "x-hasura-default-role": "user",
                    "x-hasura-role": "user",
                    "x-hasura-user-id": token.id,
                }
            };
            return jwt.sign(jwtClaims, secret, {algorithm: 'HS256'});
        },
        decode: async ({secret, token}) => {
            return jwt.verify(token, secret, { algorithms: ['HS256']});
        }

    },
    callbacks: {
        async session(session, token) {
            // const encodedToken = jwt.sign(token, process.env.NEXTAUTH_SECRET, { algorithm: 'HS256'});
            session.id = token.id;
            session.token = token;
            return session;
        },
        async jwt(token, user) {

            if (user) {
                token.id = user.id
            }
            return token;
        }

    }
});