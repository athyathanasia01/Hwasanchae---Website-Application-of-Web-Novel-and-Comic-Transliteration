// style
import style from "../../styles/sixthContent/componentStyle/inputText.module.scss";

type Props = {
    title: string;
    value: string;
}

export default function InputText({ title, value }: Props) {
    return (
        <input
            placeholder={title}
            className={style.input}
            value={value}
            disabled
        />
    )
}