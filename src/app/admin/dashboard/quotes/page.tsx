// components
import QuotesContent from "./content";

// metadata
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Edit Quotes`
}

export default function Page() {
    return <QuotesContent />
}