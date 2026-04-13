"use client";

// template
import { StoryStatus } from "@hwasanchae/app/template/variants"; // ✅ 
import { Tag } from "@hwasanchae/app/template/story/story"; // ✅ 

// components
import InputContainer from "./components/inputContainer";

// style
import style from "../../styles/contentTop/right/Content.module.scss";

type Props = {
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

export default function ContentTopRight(
    { 
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
        <div className={style.contentTopRight}>
            <InputContainer 
                tagInput={tagInput}
                setTagInput={setTagInput}
                handleTagKeyDown={handleTagKeyDown}
                tags={tags}
                removeTag={removeTag}
                statusStory={statusStory}
                setStatusStory={setStatusStory}
                statusDescription={statusDescription} 
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
                loadingState={loadingState}
            />
        </div>
    )
}