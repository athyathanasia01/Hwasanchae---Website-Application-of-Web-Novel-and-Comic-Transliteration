import CommunityContent from "./content";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: `Edit Community`
}

export default function Page() {
    return <CommunityContent />
}