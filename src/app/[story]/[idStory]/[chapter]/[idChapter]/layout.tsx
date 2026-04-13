// technical
import { ReactNode } from "react";

export default function FootnoteLayout({ children, modal }: { children: ReactNode, modal: ReactNode }) {
    return (
        <>
            { children }
            { modal }
        </>
    )
}