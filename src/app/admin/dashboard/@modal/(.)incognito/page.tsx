// modal
import dynamic from "next/dynamic";
const Modal = dynamic(() => import(`@hwasanchae/components/core/modal`))

// components
import IncognitoContent from "./content";

export default function Page() {
    return (
        <Modal>
            <IncognitoContent />
        </Modal>
    )
}