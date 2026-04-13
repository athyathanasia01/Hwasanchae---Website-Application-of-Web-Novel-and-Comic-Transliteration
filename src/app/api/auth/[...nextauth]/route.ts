// netx auth
import NextAuth, { NextAuthOptions, User } from "next-auth";

// provider
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// service
import { login, loginGoogle } from "@hwasanchae/lib/firebase/service";

// encrypt
import { compare } from "bcrypt";

// AUTH OPTIONS
export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: `Credentials`,
            credentials: {
                email: { label: `Email`, type: 'email', placeholder: `your-email@mail.com` },
                password: { label: `Password`, type: `password` }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;

                const { email, password } = credentials;

                const user = await login({ email, password });
                const userData = user.data as User;

                if (userData) {
                    const confirmPassword = await compare(password, userData.password);
                    if (confirmPassword) {
                        return userData;
                    }

                    return null;
                } else {
                    return null;
                }
            },
        }), 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: `select_account`
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === 'credentials') {
                token.id = user.id;
                token.role = user.role;
            }

            if (account?.provider === 'google') {
                const data = {
                    email: user.email,
                    username: user.name,
                    profile: user.image
                }

                const responseLogin = await loginGoogle(data);
                if (responseLogin.status === 'Success' && responseLogin.data) {
                    const responseData = responseLogin.data;
                    
                    token.id = responseData.id;
                    token.role = responseData.role;
                }
            }

            return token;
        },
        async session({ session, token }: any) {
            session.user = {
                id: token.id,
                role: token.role,
            };
            return session;
        }
    },
    pages: {
        signIn: `/auth/login`,
        signOut: `/`
    }
}

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST
}