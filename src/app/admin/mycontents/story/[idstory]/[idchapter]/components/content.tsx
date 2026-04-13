"use client";

// technical
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "vm";
import { useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"
import HorizontalRule from "@tiptap/extension-horizontal-rule";

// template
import { MyChapter } from "@hwasanchae/app/template/story/chapter"; // ✅ 
import { FootnoteInput } from "@hwasanchae/app/template/story/footnote"; // ✅ 

// components
import TopContent from "./topContent/content";
import BottomContent from "./bottomContent/content";

// style
import style from "./styles/Content.module.scss";

type Props = {
    idStory: string;
    idChapter: string | null | undefined;
}

async function getChapterData(idChapter: string) {
    try {
        const response = await fetch(`/api/chapter?idChapter=${idChapter}`, {
            method: `GET`,
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        const result = data.data as MyChapter;

        return result;
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get data chapter: ${error}`);
        return null;
    }
}

export default function Content({ idStory, idChapter }: Props) {
    const { push } = useRouter();
    
    if (idChapter === 'chapter') {
        idChapter = null;
    }

    console.log({ idStory, idChapter });

    const [vote, setVote] = useState<number>(0);
    const [read, setRead] = useState<number>(0);
    const [commentId, setCommentId] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [context, setContext] = useState<Context | string | null>(null);
    const [footnotes, setFootnotes] = useState<FootnoteInput[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            if (idChapter) {
                const chapterData = await getChapterData(idChapter);

                setTimeout(() => {
                    if (chapterData) {
                        setVote(chapterData.vote);
                        setRead(chapterData.read);
                        setCommentId(chapterData.commentId);
                        setTitle(chapterData.title);
                        setContext(chapterData.content);
                        setFootnotes(chapterData.footnotes);
                    }

                    setIsLoading(false);
                }, 1000);
            } else {
                setIsLoading(false);
            }
        }

        loadData();
    }, [idChapter]);
    
    function handleOnChangeTitle(e: any) {
        setTitle(e.target.value);
    }

    function handleBackButton() {
        push(`/admin/mycontents/story/${idStory}`);
    }

    async function handleSaveDraft() {
        // CODE SAVE DRAFT HERE
        if (idChapter) {
            setIsLoading(true);
            try {
                const newData = {
                    title: title,
                    content: editor?.getJSON(),
                    footnotes: footnotes,
                    vote: vote,
                    read: read,
                    status: 'draft',
                    commentId: commentId
                }

                const response = await fetch(`/api/chapter?idChapter=${idChapter}`, {
                    method: `PUT`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...newData })
                });

                setTimeout(() => {
                    setIsLoading(false);
                    if (response.status === 200) {
                        push(`/admin/mycontents/story/${idStory}`);
                    }
                }, 1000);
            } catch (error) {
                alert(`Error: ${error}`);

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        } else {
            setIsLoading(true);
            try {
                const data = {
                    title: title,
                    content: editor?.getJSON(),
                    footnotes: footnotes,
                    vote: vote,
                    read: read,
                    status: 'draft',
                    commentId: commentId
                }

                const response = await fetch(`/api/chapter?idStory=${idStory}`, {
                    method: `POST`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...data })
                });

                setTimeout(() => {
                    setIsLoading(false);
                    if (response.status === 200) {
                        push(`/admin/mycontents/story/${idStory}`);
                    }
                }, 1000);
            } catch (error) {
                alert(`Error: ${error}`);

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        }
    }

    async function handleSaveupdate() {
        // CODE SAVE UPDATE HERE
        if (idChapter) {
            setIsLoading(true);
            try {
                const newData = {
                    title: title,
                    content: editor?.getJSON(),
                    footnotes: footnotes,
                    vote: vote,
                    read: read,
                    status: 'published',
                    commentId: commentId
                }

                const response = await fetch(`/api/chapter?idChapter=${idChapter}`, {
                    method: `PUT`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...newData })
                });

                setTimeout(() => {
                    setIsLoading(false);
                    if (response.status === 200) {
                        push(`/admin/mycontents/story/${idStory}`);
                    }
                }, 1000);
            } catch (error) {
                alert(`Error: ${error}`);

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        } else {
            setIsLoading(true);
            try {
                const data = {
                    title: title,
                    content: editor?.getJSON(),
                    footnotes: footnotes,
                    vote: vote,
                    read: read,
                    status: 'published',
                    commentId: commentId
                }

                const response = await fetch(`/api/chapter?idStory=${idStory}`, {
                    method: `POST`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...data })
                });

                setTimeout(() => {
                    setIsLoading(false);
                    if (response.status === 200) {
                        push(`/admin/mycontents/story/${idStory}`);
                    }
                }, 1000);
            } catch (error) {
                alert(`Error: ${error}`);

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        }
    }

    function addFootnote() {
        setFootnotes(prev => [...prev, { phrase: "", meaning: "" }]);
    }

    function removeFootnote(idFootnote: number) {
        setFootnotes(prev => prev.filter((_, i) => i !== idFootnote));
    }

    function updateFootnote(idFootnote: number, field: "phrase" | "meaning", value: string) {
        const updated = [...footnotes];
        updated[idFootnote][field] = value;
        setFootnotes(updated);
    }

    async function deleteChapter() {
        // SET DELETE
        setIsLoading(true);
        try {
            const response = await fetch(`/api/chapter?idChapter=${idChapter}&idStory=${idStory}`, {
                method: `DELETE`,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setTimeout(() => {
                setIsLoading(false);
                if (response.status === 200) {
                    push(`/admin/mycontents/story/${idStory}`);
                }
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    const editor = useEditor({
        immediatelyRender: false,
        editorProps: {
            attributes: {
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                "aria-label": "Main content area, start typing to enter text.",
                class: "simple-editor",
            },
        },
        extensions: [
            StarterKit.configure({
                horizontalRule: false,
                link: {
                    openOnClick: false,
                    enableClickSelection: true,
                    validate: href => true,
                },
            }),
            HorizontalRule,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            Image,
            Typography,
            Superscript,
            Subscript,
            Selection
        ]
    })

    useEffect(() => {
        if (editor && context) {
            editor.commands.setContent(context)
        }
    }, [editor, context]);

    return (
        <div className={style.chapterContainer}>
            <TopContent 
                title={title} 
                handleOnChangeTitle={(e) => handleOnChangeTitle(e)} 
                saveDraftClicked={handleSaveDraft} 
                saveUpdateClicked={handleSaveupdate} 
                deleteChapterClicked={deleteChapter} 
                handleBackButton={handleBackButton}
                loadingState={isLoading}
            />
            <div className={style.chapterContainer__horizontalLine}></div>
            <BottomContent 
                editor={editor} 
                addFootnote={addFootnote} 
                removeFootnote={removeFootnote} 
                updateFootnote={updateFootnote} 
                footnotes={footnotes} 
                loadingState={isLoading}
            />
        </div>
    )
}