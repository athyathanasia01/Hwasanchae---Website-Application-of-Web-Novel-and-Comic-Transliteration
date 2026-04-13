// technical
import React from "react";

// template
import { InputPageName } from "@hwasanchae/app/template/variants" // ✅ 

// components
import InputContainer from "./inputContainer";

// style
import style from "../styles/rightContent/InputContent.module.scss";

type Props = {
    pageName: InputPageName;
    valueUsername?: string;
    handleOnChangeUsername?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valueEmail: string;
    handleOnChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valuePassword: string;
    handleOnChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputContent(
    { 
        pageName,
        valueUsername,
        handleOnChangeUsername,
        valueEmail,
        handleOnChangeEmail,
        valuePassword,
        handleOnChangePassword
    }: Props
) {
    return (
        <div className={style.inputContent}>
            {pageName === "register" && handleOnChangeUsername && 
                <InputContainer 
                    htmlFor="username"
                    label="Username" 
                    typeInput="text"
                    value={valueUsername ?? ""} 
                    handleOnChangeValue={handleOnChangeUsername} 
                />
            }
            <InputContainer 
                htmlFor="email"
                label="Email/Username" 
                typeInput="text"
                value={valueEmail} 
                handleOnChangeValue={handleOnChangeEmail} 
            />
            <InputContainer 
                htmlFor="password"
                label="Password" 
                typeInput="password"
                value={valuePassword} 
                handleOnChangeValue={handleOnChangePassword} 
            />
        </div>
    )
}