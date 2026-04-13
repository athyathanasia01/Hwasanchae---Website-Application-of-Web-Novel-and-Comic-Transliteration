// modal
import dynamic from "next/dynamic";
const Modal = dynamic(() => import(`@hwasanchae/components/core/modal`));

// components
import ContentPage from "./content";

export default function Page() {
    return (
        <Modal>
            <ContentPage />
        </Modal>
    )
}