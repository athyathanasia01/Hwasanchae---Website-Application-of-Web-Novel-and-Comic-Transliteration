// technical
import React from "react";

// components
import AdminLayoutClient from "./AdminLayoutClient";

// metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: `Hwasanchae Admin | %s`,
        default: `Hwasanchae Admin`
    },
    description: `This site required access only for admin user, other user can't be access without permission!`,
    abstract: `This site is dashboard for admin create, read, update, or even delete data for story and chapter`
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AdminLayoutClient>{ children }</AdminLayoutClient>
}