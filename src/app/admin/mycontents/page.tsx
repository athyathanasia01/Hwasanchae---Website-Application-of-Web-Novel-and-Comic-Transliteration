// components
import Content from "./components/content";

// metadata
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `My Content Story List`
}

export default function MyContentsPage() {
    return <Content />
}