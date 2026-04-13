// technical
import React from "react";

// template
import { SourceInput } from "@hwasanchae/app/template/variants"; // ✅ 

// style
import style from "./styles/componentStyle/Input.module.scss";

type Props = {
    source: SourceInput;
    title: string;
    value: string;
    setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ source, title, value, setValue }: Props) {
    return (
        <>
            {source === "donate" ?
                <div className={style.inputContainer}>
                    <span className={style.inputContainer__title}>{title}</span>
                    <input className={style.inputContainer__input} value={value} onChange={(e) => setValue(e)} type="text" />
                </div>
            : 
                <input className={style.input} value={value} onChange={(e) => setValue(e)} type="text" placeholder={title!} />
            }
        </>
    )
}