// modal
import dynamic from "next/dynamic";
const Modal = dynamic(() => import(`@hwasanchae/components/core/modal`))

// components
import DonatesContent from "./content";

export default function Page() {
    return (
        <Modal>
            <DonatesContent />
        </Modal>
    )
}