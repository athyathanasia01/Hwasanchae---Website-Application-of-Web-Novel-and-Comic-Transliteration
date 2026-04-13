// technical
import { RefObject } from "react";

// template
import { StoryStatus } from "@hwasanchae/app/template/variants"; // ✅ 
import { Tag } from "@hwasanchae/app/template/story/story"; // ✅ 

// components
import ContentTopLeft from "./left/content";
import ContentTopRight from "./right/content";

// style
import style from "../styles/contentTop/Content.module.scss";

type Props = {
    inputRef: RefObject<HTMLInputElement | null>;
    preview: string | null;
    handleChangePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickPreview: () => void;
    handleClickBack: () => void;
    title: string | null;
    onChangeTitle: (e: any) => void;
    writer: string | null;
    onChangeWriter: (e: any) => void;
    firstRelease: string | null;
    onChangeFirstRelease: (e: any) => void;
    translator: string | null;
    onChangeTranslator: (e: any) => void;
    nativeLang: string | null;
    onChangeNative: (e: any) => void;
    type: string | null;
    onChangeType: (e: any) => void;
    transLang: string | null;
    onChangeTranslated: (e: any) => void;
    tagInput: string | null;
    setTagInput: (e: any) => void;
    handleTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    tags: Tag[];
    removeTag: (id: string) => void;
    statusStory: StoryStatus;
    setStatusStory: (e: any) => void;
    statusDescription: string;
    loadingState: boolean;
}

export default function ContentTop(
    { 
        inputRef,
        preview, 
        handleChangePreview,
        handleClickPreview, 
        handleClickBack,
        title,
        onChangeTitle,
        writer,
        onChangeWriter,
        firstRelease,
        onChangeFirstRelease,
        translator,
        onChangeTranslator,
        nativeLang,
        onChangeNative,
        type,
        onChangeType,
        transLang,
        onChangeTranslated,
        tagInput, 
        setTagInput, 
        handleTagKeyDown,
        tags,
        removeTag,
        statusStory,
        setStatusStory,
        statusDescription,
        loadingState
    }: Props
) {
    return (
        <div className={style.contentTop}>
            <ContentTopLeft 
                inputRef={inputRef}
                preview={preview} 
                handleChangePreview={handleChangePreview} 
                handleClickPreview={handleClickPreview}
                handleClickBack={handleClickBack}
                loadingPreview={loadingState}
            />
            <ContentTopRight 
                title={title} 
                onChangeTitle={onChangeTitle} 
                writer={writer} 
                onChangeWriter={onChangeWriter} 
                firstRelease={firstRelease} 
                onChangeFirstRelease={onChangeFirstRelease} 
                translator={translator} 
                onChangeTranslator={onChangeTranslator} 
                nativeLang={nativeLang} 
                onChangeNative={onChangeNative} 
                type={type} 
                onChangeType={onChangeType} 
                transLang={transLang} 
                onChangeTranslated={onChangeTranslated} 
                tagInput={tagInput} 
                setTagInput={setTagInput} 
                handleTagKeyDown={handleTagKeyDown} 
                tags={tags} 
                removeTag={removeTag} 
                statusStory={statusStory} 
                setStatusStory={setStatusStory} 
                statusDescription={statusDescription} 
                loadingState={loadingState}
            />
        </div>
    )
}