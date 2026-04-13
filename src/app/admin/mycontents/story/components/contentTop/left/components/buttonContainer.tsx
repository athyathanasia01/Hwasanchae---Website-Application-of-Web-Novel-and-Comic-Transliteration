// template
import { Color } from "@hwasanchae/app/template/variants"; // ✅ 

// style
import style from "../../../styles/contentTop/left/componentStyle/ButtonContainer.module.scss";

type Props = {
    color: Color;
    name: string;
    type: "submit" | "reset" | "button";
    onClick?: () => void;
}

export default function ButtonContainer({ color, name, type, onClick }: Props) {
    return(
        <button className={`${style.buttonContainer} ${style[`buttonContainer--${color}`]}`} onClick={onClick} type={type}>
            {name}
        </button>
    )
}