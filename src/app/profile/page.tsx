import Content from "./content";

// metadata
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `My Profile`
}

export default function Page() {
    return <Content />
}