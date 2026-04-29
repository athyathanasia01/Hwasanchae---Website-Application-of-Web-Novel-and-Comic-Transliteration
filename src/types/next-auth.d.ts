import { Preview } from "@hwasanchae/app/template/hwasanchae/profile";
import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string | null;
            role?: "admin" | "reader" | "developer";
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        email: string;
        name: string;
        role: "admin" | "reader" | "developer";
        password: string;
        loginSetup: ("Google" | "credentials")[];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string | null;
        role?: "admin" | "reader" | "developer";
    }
}