"use client";

// technical
import { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { Selection } from "@tiptap/extensions";
import { ImageUploadNode } from "@hwasanchae/components/tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@hwasanchae/lib/tiptap-utils";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

// helper
import { slugify } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { DetailStory, LastReadStorage, MyStory } from "@hwasanchae/app/template/story/story"; // ✅ 
import { ChapterNextPrev, MyChapter } from "@hwasanchae/app/template/story/chapter"; // ✅ 
import { CommentData } from "@hwasanchae/app/template/story/comment"; // ✅ 

// components
import BottomContent from "./bottomContent/content";
import TopContent from "./topContent/content";
import ContentComment from "./commentContent/content";

// style
import style from "./styles/Content.module.scss";

async function updateDataReadLike(idChapter: string, data: string, updown: "up" | "down" | null = null) {
    try {
        const params = new URLSearchParams({
            idChapter,
            data,
        });

        if (updown) {
            params.append("updown", updown);
        }

        let url = `/api/chapter?${params.toString()}`;
        
        await fetch(url, {
            method: 'PUT'
        });
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error add new read in ${idChapter}: ${error}`);
    }
}

type Props = {
    storyData: MyStory;
    chapterData: MyChapter;
    commentList: CommentData[];
    donationList: Donation[];
    communityList: SocialMedia[];
    prevChapterData: ChapterNextPrev | null;
    nextChapterData: ChapterNextPrev | null;
}

export default function Content({ storyData, chapterData, commentList, donationList, communityList, prevChapterData, nextChapterData }: Props) {
    const [story, setStory] = useState<DetailStory>({ ...storyData, isBookmark: false });
    const [chapter, setChapter] = useState<MyChapter>(chapterData);
    const [comments, setComments] = useState<CommentData[]>(commentList);
    const [donations, setDonations] = useState<Donation[]>(donationList);
    const [communities, setCommunities] = useState<SocialMedia[]>(communityList);

    const [isLike, setIsLike] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;

        const votes = localStorage.getItem("votes");
        const voteList = votes ? JSON.parse(votes) : [];
        return voteList.includes(chapterData.id);
    });
    const [isBookmark, setIsBookmark] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;

        const bookmarks = localStorage.getItem("bookmarks");
        const bookmarkList = bookmarks ? JSON.parse(bookmarks) : [];
        return bookmarkList.includes(storyData.id);
    });
    const [prevChapter, setPrevChapter] = useState<ChapterNextPrev | null>(prevChapterData);
    const [nextChapter, setNextChapter] = useState<ChapterNextPrev | null>(nextChapterData);

    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        async function loadData() {
            await updateDataReadLike(chapter.id, "read");
            
            const hasRead = localStorage.getItem("hasRead");
            const listHasRead: string[] = hasRead ? JSON.parse(hasRead) : [];

            const isHasRead = listHasRead.includes(chapter.id);

            if (!isHasRead) {
                const updatedHasRead = [...listHasRead, chapter.id];
                localStorage.setItem("hasRead", JSON.stringify(updatedHasRead));
            }
        }

        loadData();
    }, [chapter]);

    useEffect(() => {
        const lastRead = localStorage.getItem("lastRead");
        const listLastRead: LastReadStorage[] = lastRead ? JSON.parse(lastRead) : [];
        const storyLastIndex = listLastRead.findIndex(last => last.idStory === story.id);

        if (storyLastIndex === -1) {
            listLastRead.push(
                { 
                    idStory: story.id, 
                    chapter: [chapter.id] 
                }
            );
        } else {
            const isChapterExist = listLastRead[storyLastIndex].chapter.includes(chapter.id);

            if (!isChapterExist) {
                listLastRead[storyLastIndex].chapter.push(chapter.id);
            }
        }

        localStorage.setItem("lastRead", JSON.stringify(listLastRead));

        const storyDt = { ...storyData, isBookmark: isBookmark };
        const prevNextChapter = {
            dataPrev: prevChapterData,
            dataNext: nextChapterData
        };
        const filteredDonation = donationList.filter(donate => donate.link);
        const filteredCommunity = communityList.filter(community => community.link);

        setStory(storyDt);
        setChapter(chapterData);

        if (prevNextChapter?.dataPrev) setPrevChapter(prevNextChapter.dataPrev);
        if (prevNextChapter?.dataNext) setNextChapter(prevNextChapter.dataNext);

        setDonations(filteredDonation);
        setCommunities(filteredCommunity);
    }, [storyData, chapterData, donationList, communityList, prevChapterData, nextChapterData]);

    async function handleOnClickLike() {
        const votes = localStorage.getItem("votes");
        const voteList: string[] = votes ? JSON.parse(votes) : [];
        
        const isExist = voteList.includes(chapter.id);

        setChapter(prev => {
            if (!prev) return prev;

            return {
                ...prev, 
                vote: isExist ? prev.vote - 1 : prev.vote + 1
            }
        });

        const updatedVoteList = isExist 
            ? voteList.filter((vote) => vote !== chapter.id)
            : [...voteList, chapter.id];

        localStorage.setItem("votes", JSON.stringify(updatedVoteList));
        setIsLike(!isLike);

        await updateDataReadLike(chapter.id, "vote", isExist ? "down" : "up");
    }

    async function handleOnClickBookmark() {
        const bookmarks = localStorage.getItem("bookmarks");
        const bookmarkList: string[] = bookmarks ? JSON.parse(bookmarks) : [];

        const isExist = bookmarkList.includes(story.id);

        const updatedListBookmark = isExist
            ? bookmarkList.filter((bookmark) => bookmark !== story.id)
            : [...bookmarkList, story.id];

        localStorage.setItem("bookmarks", JSON.stringify(updatedListBookmark));

        setIsBookmark(prev => !prev);
    }

    const editor = useEditor({
        immediatelyRender: false,
        editable: false,
        editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                "aria-label": "Main content area, start typing to enter text.",
                class: "simple-editor"
            },
        },
        extensions: [
            StarterKit.configure({
                horizontalRule: false,
            }),
            Link,
            HorizontalRule,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            Image,
            Typography,
            Superscript,
            Subscript,
            Selection,
            ImageUploadNode.configure({
                accept: "/image/*",
                maxSize: MAX_FILE_SIZE,
                limit: 3,
                upload: handleImageUpload,
                onError: (error) => console.log("Upload failed: ", error)
            })
        ],
        content: <p>Loading....</p>
    });

    function transformFootnote(content: any, story: any, chapter: any) {
        if (!content) return content;

        const walk = (node: any): any => {
            if (node.marks) {
                node.marks = node.marks.map((mark: any) => {
                    if (
                        mark.type === "link" &&
                        mark.attrs?.href &&
                        /^\d+$/.test(mark.attrs.href)
                    ) {
                        return {
                            ...mark,
                            attrs: {
                                ...mark.attrs,
                                href: `/${slugify(story.title)}/${story.id}/${slugify(chapter.title)}/${chapter.id}/footnote/${mark.attrs.href}`
                            }
                        };
                    }
                    return mark;
                });
            }

            if (node.content) {
                node.content = node.content.map(walk);
            }

            return node;
        };

        return walk(structuredClone(content));
    }

    useEffect(() => {
        let content = chapter?.content;
        if (!editor || !content || !story || !chapter) return;

        if (typeof content === "string") {
            content = content.replace(
                /href="(\d+)"/g,
                `href="/${slugify(story.title)}/${story.id}/${slugify(chapter.title)}/${chapter.id}/footnote/$1"`
            );
        } else {
            content = transformFootnote(content, story, chapter);
        }

        editor.commands.setContent(content);

        console.log(content);
    }, [chapter, editor, story]);

    return (
        <div className={style.content}>
            {story && chapter ?
                <>
                    <div className={style.content__topContent}>
                        <TopContent 
                            story={story} 
                            chapter={chapter} 
                        />
                        {editor && 
                            <BottomContent 
                                editor={editor} 
                                story={story} 
                                donations={donations} 
                                communities={communities} 
                                isLike={isLike} 
                                isBookmark={isBookmark}
                                handleOnClickLike={handleOnClickLike} 
                                handleOnClickBookmark={handleOnClickBookmark} 
                                nextChapter={nextChapter}
                                prevChapter={prevChapter}
                            />
                        }
                    </div>
                    <div className={style.content__horizontalLine}></div>
                    <ContentComment 
                        commentList={comments}
                        commentId={chapter.commentId ? chapter.commentId : ""}
                    />
                </>
            : 
                <span>No data Found</span>
            }
        </div>
    )
}