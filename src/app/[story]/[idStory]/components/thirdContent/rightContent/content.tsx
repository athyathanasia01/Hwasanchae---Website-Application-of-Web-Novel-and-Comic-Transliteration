// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅

// components
import ButtonNavigation from "./components/buttonNav";
import FindTranslator from "./components/findTranslator";

// style
import style from "../../styles/thirdContent/rightContent/Content.module.scss";

type Props = {
    handleOnClickFirstUpdate: () => void;
    chapterFirstUpdate: string;
    handleOnClickLatestUpdate: () => void;
    handleOnClickGlosarium: () => void;
    chapterLatestUpdate: string;
    translator: string;
    listMediaTranslator: SocialMedia[];
}

export default function RightContent(
    {
        handleOnClickFirstUpdate,
        chapterFirstUpdate,
        handleOnClickLatestUpdate,
        handleOnClickGlosarium,
        chapterLatestUpdate,
        translator,
        listMediaTranslator
    }: Props
) {
    return (
        <div className={style.rightContent}>
            <div className={style.rightContent__buttonContainer}>
                <ButtonNavigation 
                    handleOnClick={handleOnClickFirstUpdate} 
                    buttonTitle="First Update" 
                    chapterName={chapterFirstUpdate} 
                />
                <ButtonNavigation 
                    handleOnClick={handleOnClickLatestUpdate} 
                    buttonTitle="Latest Update"
                    chapterName={chapterLatestUpdate} 
                />
            </div>
            <button className={style.rightContent__glosarium} onClick={handleOnClickGlosarium}>See Story Glossary</button>
            <FindTranslator 
                translator={translator} 
                listMediaTranslator={listMediaTranslator} 
            />
        </div>
    )
}