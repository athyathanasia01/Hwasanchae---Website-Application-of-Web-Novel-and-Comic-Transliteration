"use client";

// technical
import { useRouter } from "next/navigation";

// style
import style from "../styles/componentStyle/ButtonAdd.module.scss";

export default function ButtonAddNewStory() {
    const { push } = useRouter();

    function goToEditAddNew() {
        push("/admin/mycontents/story");
    }

    return (
        <button 
            className={style.buttonAdd} 
            onClick={goToEditAddNew} 
        >
            Add New Story
        </button>
    )
}