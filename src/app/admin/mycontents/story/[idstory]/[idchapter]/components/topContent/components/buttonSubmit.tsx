// template
import { Color } from "@hwasanchae/app/template/variants"; // ✅ 

// style
import style from "../../styles/topContent/componentStyle/ButtonSubmit.module.scss";

type Props = {
    color: Color;
    name: string;
    onClick: () => void;
}

export default function ButtonSubmit({ color, name, onClick }: Props) {
    return(
        <button 
            className={`${style.buttonSubmit} ${style[`buttonSubmit--${color}`]}`} 
            onClick={onClick}
        >
            {name}
        </button>
    )
}