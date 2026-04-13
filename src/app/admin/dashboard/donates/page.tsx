// components
import DonatesContent from "./content";

// metadata
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Edit Donations`
}

export default function Page() {
    return <DonatesContent />
}