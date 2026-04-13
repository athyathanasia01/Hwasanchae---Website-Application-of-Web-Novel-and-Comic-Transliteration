// components
import Content from "./components/content";

// metadata
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Dashboard`
}

export default function Page() {
    return <Content />
}