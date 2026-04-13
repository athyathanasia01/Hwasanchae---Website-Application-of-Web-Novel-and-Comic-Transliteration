// template
import { Color } from "@hwasanchae/app/template/variants"; // ✅ 

// style
import style from "./styles/componentStyle/Button.module.scss";

type Props = {
    onClick: () => void;
    color: Color;
    name: string;
    loading: boolean;
}

export default function Button({ onClick, color, name, loading }: Props) {
    return (
        <button 
            className={`${style.button} ${style[`button--${color}`]}`}
            onClick={onClick}
            disabled={loading}
        >
            {name}
        </button>
    )
}