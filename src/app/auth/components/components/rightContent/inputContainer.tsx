// technical
import React from "react";

// style
import style from "../styles/rightContent/InputContainer.module.scss";

type Props = {
    htmlFor: string; 
    label: string; 
    typeInput: string;
    value: string; 
    handleOnChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputContainer(
    { 
        htmlFor, 
        label, 
        typeInput, 
        value, 
        handleOnChangeValue 
    }: Props
) {
    return (
        <div className={style.inputContainer}>
            <label htmlFor={htmlFor}>{label}</label>
            <input type={typeInput} value={value} onChange={handleOnChangeValue} />
        </div>
    )
}