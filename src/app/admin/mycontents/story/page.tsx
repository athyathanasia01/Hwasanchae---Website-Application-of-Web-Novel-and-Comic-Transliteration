// components
import ContentStories from "./components/content";

// metadata
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Add New Story`
}

export default async function Page() {
    return <ContentStories idStory={null} />
}