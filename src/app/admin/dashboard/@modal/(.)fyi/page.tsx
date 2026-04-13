// modal
import dynamic from "next/dynamic";
const Modal = dynamic(() => import(`@hwasanchae/components/core/modal`));

// components
import FyiContent from "./content";

export default function Page() {
    return(
        <Modal>
            <FyiContent />
        </Modal>
    )
}