// technical
import { ReactNode } from "react";

// metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Dashboard`
}

export default function Layout({ children, modal }: { children: ReactNode, modal: ReactNode }) {
    return (
        <>
            { children }
            { modal }
        </>
    )
}