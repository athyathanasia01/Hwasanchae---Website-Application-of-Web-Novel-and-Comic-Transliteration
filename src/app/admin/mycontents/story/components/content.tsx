"use client";

// technical
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

// helper
import { generateId, urlToFile } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// template
import { StoryStatus } from "@hwasanchae/app/template/variants"; // ✅ 
import { ChapterData } from "@hwasanchae/app/template/story/chapter"; // ✅ 
import { MyStory, Tag } from "@hwasanchae/app/template/story/story"; // ✅ 
import { statusDescription } from "@hwasanchae/app/template/story/status"; // ✅ 

// components
import ContentTop from "./contentTop/content";
import ContentBottom from "./contentBottom/content";

// style
import style from "./styles/Content.module.scss";

type Props = {
    idStory: string | null | undefined;
}

async function getChapterData(idStory: string) {
    try {
        const response = await fetch(`/api/chapter?idStory=${idStory}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();
        const result = data.data as ChapterData[];

        return result.sort((a, b) => a.sort - b.sort);
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get chapter list data : ${error}`);
        return [];
    }
}

async function getStoryData(idStory: string) {
    try {
        const response = await fetch(`/api/story?idStory=${idStory}`, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        const data = responseData.data as MyStory;

        return data;
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get detail story data: ${error}`);
    }
}

export default function ContentStories({ idStory }: Props) {
    const { push } = useRouter();

    const [preview, setPreview] = useState<string | null>(null);
    const [prevIllustration, setPrevIll] = useState<any | null>(null);
    const [ilustration, setIlustration] = useState<File | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [writer, setWriter] = useState<string | null>(null);
    const [firstRelease, setFirstRelease] = useState<string | null>(null);
    const [translator, setTranslator] = useState<string | null>(null);
    const [nativeLang, setNativeLang] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [transLang, setTransLang] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [statusStory, setStatusStory] = useState<StoryStatus>("On Going");
    const [summary, setSummary] = useState<string | null>(null);
    const [chapters, setChapters] = useState<ChapterData[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function loadStory() {
            setIsLoading(true);
            if (!idStory) {
                setIsLoading(false);
                return;
            };

            const nStory = await getStoryData(idStory);
            if (!nStory) {
                setIsLoading(false);
                return
            };
            
            const nTitle = nStory.title;
            const nPrevIll = nStory.coverImage;
            const nPreview = nStory.coverImage?.url;
            const nIlustration = nPreview ? await urlToFile(nPreview, `${nTitle.replace(/\s+/g, "-")}.jpg`) : null;
            const nWriter = nStory.writer;
            const nTranslator = nStory.translator.name;
            const nType = nStory.type;
            const nFirstRelease = nStory.firstRelease;
            const nNativeLang = nStory.nativeLanguage;
            const nTransLang = nStory.translatedLanguage;
            const nTags = nStory.tags;
            const nStatus = nStory.status;
            const nSummary = nStory.summary;
            const nChapterList = await getChapterData(idStory);

            setPrevIll(nPrevIll);
            setPreview(nPreview ?? null);
            setIlustration(nIlustration);
            setTitle(nTitle);
            setWriter(nWriter);
            setFirstRelease(nFirstRelease);
            setTranslator(nTranslator);
            setNativeLang(nNativeLang);
            setType(nType);
            setTransLang(nTransLang);
            setTags(nTags);
            setStatusStory(nStatus as StoryStatus);
            setSummary(nSummary);
            setChapters(nChapterList);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }

        loadStory();
    }, [idStory]);

    function handleDragEnd (event: any) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
    
        if (chapters) {
            setChapters((item) => {
                const oldIndex = item.findIndex(i => i.id === active.id);
                const newIndex = item.findIndex(i => i.id === over.id);
        
                const newArray = arrayMove(item, oldIndex, newIndex);
        
                return newArray.map((item, index) => ({
                    ...item,
                    sort: index
                }));
            })
        }
    }
    
    function addNewChapter() {
        push(`/admin/mycontents/story/${idStory}/chapter`);
    }

    function handleClickBack() {
        push(`/admin/mycontents`);
    }

    async function uploadImageIlustration() {
        if (!ilustration) return null;
        const formData = new FormData();

        formData.append("file", ilustration);
        formData.append("upload_preset", "story_upload");
        formData.append("folder", "story");

        const urlLink = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_IMAGE_LINK!;

        try {
            const result = await fetch(urlLink, {
                method: `POST`,
                body: formData
            });

            const data = await result.json();

            return {
                url: data.secure_url,
                publicId: data.public_id
            }
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error upload image: ${error}`);
        }
    }

    async function handleClickUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);
        try {
            const dataReq: any = {
                title,
                writer,
                translator: {
                    name: translator
                },
                type,
                firstRelease,
                nativeLanguage: nativeLang,
                translatedLanguage: transLang,
                tags,
                status: statusStory,
                summary,
                chapters: idStory
                    ? chapters.map(ch => ({
                        idChapter: ch.id,
                        sort: ch.sort
                    }))
                    : []
            };

            // hanya upload kalau ada perubahan
            if (preview) {
                dataReq.coverImage = await uploadImageIlustration();
            }

            const url = idStory
                ? `/api/story?idStory=${idStory}`
                : `/api/story`;

            const method = idStory ? "PUT" : "POST";

            const body = idStory
                ? JSON.stringify({
                    data: dataReq,
                    prevIdIll: prevIllustration?.publicId
                })
                : JSON.stringify(dataReq);

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body
            });

            setTimeout(() => {
                setIsLoading(false);
                if (response.status === 200) {
                    push(`/admin/mycontents`);
                }
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error click update: ${error}`);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setIlustration(file);
        }
    }

    function handleClickImage() {
        inputRef.current?.click();
    }

    function handleOnChangeTitle(e: any) {
        setTitle(e.target.value);
    } 

    function handleOnChangeWriter(e: any) {
        setWriter(e.target.value);
    } 

    function handleOnChangeFirstRelease(e: any) {
        setFirstRelease(e.target.value);
    } 

    function handleOnChangeTranslator(e: any) {
        setTranslator(e.target.value);
    } 

    function handleOnChangeNativeLang(e: any) {
        setNativeLang(e.target.value);
    } 

    function handleOnChangeType(e: any) {
        setType(e.target.value);
    } 

    function handleOnChangeTranslated(e: any) {
        setTransLang(e.target.value);
    }

    function addTag() {
        const trimmed = tagInput.trim();

        if(!trimmed) {
            setTagInput("");
            return;
        }

        if(tags.some((tag) => tag.tag === trimmed)) {
            setTagInput("");
            return;
        }

        if(tags.length >= 10) {
            alert(`You approach maximum tag. Please remove one to add new tag!`);
            setTagInput("");
            return;
        }

        const index = `tag-${generateId(5)}`;
        const newTag = {
            index: index,
            tag: trimmed
        }

        setTags((prev) => [...prev, newTag]);
        setTagInput("");
    }

    function removeTag(id: string) {
        setTags(prev => prev.filter((tag) => tag.index !== id));
    }

    function handleOnChangeTagInput(e: any) {
        setTagInput(e.target.value)
    }

    function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    }

    function handleStatusStoryList(e: any) {
        setStatusStory(e.target.value as StoryStatus);
    }

    return (
        <form className={`${style.story} ${idStory ? '' : style[`story--full`]}`} onSubmit={handleClickUpdate}>
            <ContentTop 
                inputRef={inputRef}
                preview={preview} 
                handleChangePreview={(e) => handleChangeImage(e)} 
                handleClickPreview={handleClickImage}
                handleClickBack={handleClickBack}
                title={title} 
                onChangeTitle={(e) => handleOnChangeTitle(e)} 
                writer={writer} 
                onChangeWriter={(e) => handleOnChangeWriter(e)} 
                firstRelease={firstRelease} 
                onChangeFirstRelease={(e) => handleOnChangeFirstRelease(e)} 
                translator={translator} 
                onChangeTranslator={(e) => handleOnChangeTranslator(e)} 
                nativeLang={nativeLang} 
                onChangeNative={(e) => handleOnChangeNativeLang(e)} 
                type={type} 
                onChangeType={(e) => handleOnChangeType(e)} 
                transLang={transLang} 
                onChangeTranslated={(e) => handleOnChangeTranslated(e)} 
                tagInput={tagInput} 
                setTagInput={(e) => handleOnChangeTagInput(e)} 
                handleTagKeyDown={(e) => handleTagKeyDown(e)} 
                tags={tags} 
                removeTag={removeTag} 
                statusStory={statusStory} 
                setStatusStory={(e) => handleStatusStoryList(e)} 
                statusDescription={statusDescription[statusStory]} 
                loadingState={isLoading}
            />
            {idStory &&
                <ContentBottom 
                    idStory={idStory} 
                    summary={summary} 
                    setSummary={setSummary} 
                    chapters={chapters} 
                    handleDragEnd={(e) => handleDragEnd(e)} 
                    addNewChapter={addNewChapter}
                    loadingState={isLoading}
                />
            }
        </form>
    )
}