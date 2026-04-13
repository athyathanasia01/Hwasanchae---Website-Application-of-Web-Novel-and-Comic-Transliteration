// modal
import dynamic from "next/dynamic";
const Modal = dynamic(() => import(`@hwasanchae/components/core/modal`))

// components
import CommunityContent from "./content";

export default function Page() {
    return (
        <Modal>
            <CommunityContent />
        </Modal>
    )
}