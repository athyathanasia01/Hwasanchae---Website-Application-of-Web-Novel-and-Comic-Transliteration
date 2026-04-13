"use client";

// template
import { WidthInput } from "@hwasanchae/app/template/variants"; // ✅ 

// style
import style from "../../../styles/contentTop/right/componentStyle/InputContent.module.scss";

type Props = {
    name: string;
    placeholder?: string;
    value?: string | null;
    typeValue: string;
    variant: WidthInput;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function InputContent({ 
    name, 
    placeholder, 
    value, 
    typeValue,
    variant,
    onChange,
    onKeyDown
}: Props) {
    return (
        <div className={`${style.inputContent} ${style[`inputContent--${variant}`]}`}>
            <span className={style.inputContent__title}>{name}</span>
            <input
                className={style.inputContent__input}
                placeholder={placeholder}
                type={typeValue}
                value={value ?? ""}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}