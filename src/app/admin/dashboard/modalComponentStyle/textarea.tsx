// template
import { SourceTextArea } from "@hwasanchae/app/template/variants"; // ✅ 

// style
import style from "./styles/componentStyle/TextArea.module.scss";

type Props = {
    placeholder: string;
    onChange: (value: string) => void;
    value: string;
    source: SourceTextArea;
}

export default function TextArea({ placeholder, onChange, value, source }: Props) {
    return (
        <textarea 
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className={`${style.textArea} ${style[`textArea--${source}`]}`}
        />
    )
}