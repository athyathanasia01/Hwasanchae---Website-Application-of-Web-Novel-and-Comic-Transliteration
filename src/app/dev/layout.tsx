// technical
import React from "react";

// components
import DevLayoutClient from "./DevLayoutClient";

// metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: `Hwasanchae Developer | %s`,
        default: `Hwasanchae Developer`
    },
    description: `This site required access only for developer user, other user can't be access without permission!`,
    abstract: `This site is dashboard for developer create, read, update, or even delete data for story and chapter`
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DevLayoutClient>{ children }</DevLayoutClient>
}