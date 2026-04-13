// modal
import dynamic from "next/dynamic";
const Modal = dynamic(() => import(`@hwasanchae/components/core/modal`));

// components
import QuotesContent from "./content";

// metadata
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Edit Quotes`
}

export default function Page() {
    return (
        <Modal>
            <QuotesContent />
        </Modal>
    )
}