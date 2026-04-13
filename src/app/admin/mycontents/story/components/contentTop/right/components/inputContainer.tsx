// technical
import React from "react";

// template
import { StoryStatus } from "@hwasanchae/app/template/variants"; // ✅ 
import { Tag } from "@hwasanchae/app/template/story/story"; // ✅ 

// components
import InputContent from "./inputContent";
import Tags from "./tags";

// style
import style from "../../../styles/contentTop/right/componentStyle/InputContainer.module.scss";

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

export default function InputContainer(
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
        <div className={style.content}>
            {loadingState ?
                    <div className={style.content__inputBigLoad}></div>
                :
                    <input name="title" value={title ? title : ""} onChange={(e) => onChangeTitle(e)} placeholder="New Title" type="text" className={style.content__firstLine}/>
            }
            <div className={style.content__secondLine}>
                {loadingState ?
                        <>
                            <div className={style.content__inputSmallLoad}></div>
                            <div className={style.content__inputSmallLoad}></div>
                        </>
                    :
                        <>
                            <InputContent name="Writer" value={writer} onChange={onChangeWriter} placeholder="Writer" variant="small" typeValue="text" />
                            <InputContent name="First Release" value={firstRelease ?? ""} onChange={onChangeFirstRelease} placeholder="First Release" variant="small" typeValue="date" />
                        </>
                }
            </div>
            <div className={style.content__thirdLine}>
                {loadingState ?
                        <>
                            <div className={style.content__inputSmallLoad}></div>
                            <div className={style.content__inputSmallLoad}></div>
                        </>
                    :
                        <>
                            <InputContent name="Translator" value={translator} onChange={onChangeTranslator} placeholder="Translator" variant="small" typeValue="text" />
                            <InputContent name="Native Language" value={nativeLang} onChange={onChangeNative} placeholder="Native Language" variant="small" typeValue="text" />
                        </>
                }
            </div>
            <div className={style.content__fourthLine}>
                {loadingState ?
                        <>
                            <div className={style.content__inputSmallLoad}></div>
                            <div className={style.content__inputSmallLoad}></div>
                        </>
                    :
                        <>
                            <InputContent name="Type" value={type} onChange={onChangeType} placeholder="Type" variant="small" typeValue="text" />
                            <InputContent name="Translated Language" value={transLang} onChange={onChangeTranslated} placeholder="Translated Language" variant="small" typeValue="text" />
                        </>
                }   
            </div>
            {loadingState ?
                    <div className={style.content__fifthLineLoad}>
                        <div className={style.content__fifthLineLoad__tag}>
                            <div className={style.content__inputMediumLoad}></div>
                            <div className={style.content__fifthLineLoad__tag__containerTag}>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div className={style.content__fifthLineLoad__tag__containerTag__tagData} key={index}></div>
                                ))}
                            </div>
                        </div>
                        <div className={style.content__inputSmallLoad}></div>
                    </div>
                :
                    <div className={style.content__fifthLine}>
                        <div className={style.content__fifthLine__tag}>
                            <InputContent 
                                name="Tags" 
                                placeholder="Type and press enter to add new tag (max. 10)" 
                                variant="medium" 
                                typeValue="text" 
                                value={tagInput}
                                onChange={setTagInput} 
                                onKeyDown={handleTagKeyDown} 
                            />
                            <div className={style.content__fifthLine__tag__containerTag}>
                                {tags.map((tag) => (
                                    <Tags key={tag.index} name={tag.tag} handleOnClickTag={() => removeTag(tag.index)}/>
                                ))}
                            </div>
                        </div>
                        <div className={style.content__fifthLine__status}>
                            <div className={style.content__fifthLine__status__dropdown}>
                                <label htmlFor="statusStory">Set Status Story</label>
                                <select 
                                    name="status" 
                                    id="status" 
                                    value={statusStory} 
                                    onChange={setStatusStory}
                                >
                                    <option value="On Going">On Going</option>
                                    <option value="Hiatus">Hiatus</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Canceled / Discontinue">Canceled / Discontinue</option>
                                    <option value="Drafted">Drafted</option>
                                </select>
                            </div>
                            <div className={style.content__fifthLine__status__caution}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="16" width="16" className={style.content__fifthLine__status__caution__icon}>
                                    <g id="Info">
                                        <path id="Union" fill="#ffffff" d="M8 1.3333333333333333c3.6818666666666666 0 6.666666666666666 2.9847666666666663 6.666666666666666 6.666666666666666 0 3.6818666666666666 -2.9848 6.666666666666666 -6.666666666666666 6.666666666666666 -3.6818999999999997 0 -6.666666666666666 -2.9848 -6.666666666666666 -6.666666666666666C1.3333333333333333 4.318099999999999 4.318099999999999 1.3333333333333333 8 1.3333333333333333m0 1.3333333333333333c-2.94552 0 -5.333333333333333 2.387813333333333 -5.333333333333333 5.333333333333333 0 2.9455333333333336 2.387813333333333 5.333333333333333 5.333333333333333 5.333333333333333 2.9455333333333336 0 5.333333333333333 -2.3878 5.333333333333333 -5.333333333333333 0 -2.94552 -2.3878 -5.333333333333333 -5.333333333333333 -5.333333333333333m0 4.666666666666666c0.36819999999999997 0 0.6666666666666666 0.29846666666666666 0.6666666666666666 0.6666666666666666v2h1v1.3333333333333333h-3.333333333333333v-1.3333333333333333H7.333333333333333v-1.3333333333333333H6.333333333333333v-1.3333333333333333zm-0.16666666666666666 -2.6666666666666665c0.46026666666666666 0 0.8333333333333333 0.37309333333333333 0.8333333333333333 0.8333333333333333s-0.37306666666666666 0.8333333333333333 -0.8333333333333333 0.8333333333333333 -0.8333333333333333 -0.37309333333333333 -0.8333333333333333 -0.8333333333333333S7.373066666666666 4.666666666666666 7.833333333333333 4.666666666666666" strokeWidth="0.6667"></path>
                                    </g>
                                </svg>
                                <span className={style.content__fifthLine__status__caution__text}>{statusDescription}</span>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}