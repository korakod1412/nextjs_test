import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type JWT } from "next-auth/jwt";
import { type Adapter } from "next-auth/adapters";
import credentialProvider from "next-auth/providers/credentials";
import { generateRefreshToken } from "~/features/auth/helpers/token";
import { env } from "~/env";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { type Role } from "@prisma/client";
import { type user } from "@prisma/client";
import { user as UserModel } from "@prisma/client";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      role: Role;
    } & DefaultSession["user"];
  }
  /*interface User extends UserModel {
    role: Role;
    refreshTokenExpires: number;
    refreshToken: string;
  }*/

  export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    refreshTokenExpires?: number | null;
    refreshToken?: string;
    role?: Role | null;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires: number;
    refreshToken: string;
    exp: number;
    iat: number;
    jti: string;
  }
}

async function refreshToken(token: JWT) {
  const data = generateRefreshToken();
  console.log("resreshToken: ", JSON.stringify(token));

  await db.user.update({
    where: {
      refreshToken: token.refreshToken,
    },
    data,
  });

  return data;
}

function isUpdateSessionData(
  session: unknown,
): session is Record<"name" | "email" | "image", string | undefined> {
  if (!session) return false;
  if (typeof session !== "object") return false;
  if ("name" in session && "email" in session && "image" in session) {
    return true;
  }

  return false;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export async function getDuplicationEmail(email: string) {
  let data = await db.user.findFirst({
    where: {
      email: email,
    },
  });
  console.log("get email=" + JSON.stringify(data));
  return data;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // jwt: {
  //   secret: 'super-secret',
  //   maxAge: 15 * 24 * 30 * 60, // 15 days
  // },

  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === "update" && isUpdateSessionData(session)) {
        token.picture = session.image;
        token.name = session.name;
        token.email = session.email;
      }

      if (user) {
        console.log("allUser:" + JSON.stringify(user));
        token.sub = user.id;
        token.email = user.email;
        token.role = user.role;
        token.refreshToken = user.refreshToken as string; //edit refresh token
        console.log("token: " + JSON.stringify(token));
        return { ...token, ...(await refreshToken(token)) };
      }

      if (token?.exp && Date.now() < token?.exp) {
        return { ...token, ...(await refreshToken(token)) };
      }

      return token;
    },
    session: ({ session, token }) => {
      const currentTimeInSecond = Date.now() / 1_000;

      if (
        currentTimeInSecond > token?.exp &&
        currentTimeInSecond > token.iat + token.refreshTokenExpires
      ) {
        return Promise.reject({
          error: new Error(
            "Refresh token has expired. Please log in again to get a new refresh token.",
          ),
        });
      }

      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
          name: token.name,
          email: token.email,
          image: token.picture,
        },
      });
    },
  },

  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    credentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        console.log("user=" + JSON.stringify(user));

        if (!user) return null;
        if (!user?.password) return null;
        if (!credentials?.password) return null;

        if (!(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }
        return { ...user, id: user.id.toString() } as any;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
