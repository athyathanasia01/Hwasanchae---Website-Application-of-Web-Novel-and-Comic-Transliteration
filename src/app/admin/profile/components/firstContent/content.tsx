"use client"

// technical 
import { ChangeEvent, RefObject } from "react";

// components
import AboutMe from "./components/aboutMe";
import ImageUploader from "./components/imageUploader";

// template
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 

// style
import style from "../styles/firstContent/FirstContent.module.scss";

type Props = {
    inputRef: RefObject<HTMLInputElement | null>;
    preview: Preview | null;
    handleClickPreview: () => void;
    handleChangePreview: (e: ChangeEvent<HTMLInputElement>) => void;
    about: string;
    username: string;
    handleOnChangeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
    handleOnChangeAbout: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    loadingStatePreview: boolean;
    loadingState: boolean;
}

export default function FirstContent(
    { 
        inputRef, 
        preview, 
        handleClickPreview, 
        handleChangePreview,
        about, 
        username,
        handleOnChangeUsername,
        handleOnChangeAbout,
        loadingStatePreview,
        loadingState
    }: Props
) {
    return (
        <div className={style.firstContent}>
            <ImageUploader 
                inputRef={inputRef} 
                preview={preview?.url ?? "/image/profile_avatar.jpg"} 
                handleClickPreview={handleClickPreview} 
                handleChangePreview={handleChangePreview} 
                loadingStatePreview={loadingStatePreview}
            />
            <AboutMe 
                aboutme={about} 
                username={username} 
                handleOnChangeUsername={(e) => handleOnChangeUsername(e)} 
                handleOnChangeAbout={(e) => handleOnChangeAbout(e)}
                loadingState={loadingState}
            />
        </div>
    )
}