"use client";

// technical
import React, { useEffect, useState } from "react";

// template
import { CommentData } from "@hwasanchae/app/template/story/comment"; // ✅ 

// components
import CommentContent from "./components/commentContent";
import InputComment from "./components/inputComment";

// style
import style from "../styles/commentContent/Content.module.scss";

type Props = {
    commentId: string;
    commentList: CommentData[];
}

async function getCommentList(idComment: string) {
    try {
        const response = await fetch(`/api/comment?idComment=${idComment}`, {
            cache: "no-store"
        });
        const responseData = await response.json();
        if (responseData.data) {
            const commentData = responseData.data;
            console.log({ commentData });
            return commentData;
        }

        return [];
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get comment list: ${error}`);

        return [];
    }
}

export default function ContentComment(
    {
        commentId,
        commentList
    }: Props
) {
    const [comment, setComment] = useState("");
    const [incognito, setIncognito] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentData[]>([]);

    useEffect(() => {
        setComments(commentList);
    }, [commentList]);

    function handleOnChangeInputComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setComment(e.target.value);
    }

    async function handleOnSubmitComment() {
        // send API
        if (comment === "") {
            alert(`Comment must have minimal 1 characters`);
            return;
        }

        try {
            if (commentId) {
                const params = new URLSearchParams({
                    idComment: commentId
                });

                let url = `/api/comment`;
                if (params) {
                    url += `?${params.toString()}`;
                }

                await fetch(url, {
                    method: `PUT`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment, incognito })
                });

                refreshComments();
                setComment("");

                console.log(`function ini terpanggil`);
            } else {
                alert(`Comment ID doesn't set up`);
            }
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error submit new comment: ${error}`);
        }
    }

    function handleOnChangeIncognito() {
        setIncognito(!incognito);
    }

    async function refreshComments() {
        if (commentId) {
            const commentList = await getCommentList(commentId);
            setComments(commentList);
        }
    }

    return (
        <div className={style.contentComment}>
            <InputComment 
                textComment={comment} 
                handleOnChangeInputComment={handleOnChangeInputComment} 
                handleOnSendButton={handleOnSubmitComment} 
                incognito={incognito} 
                handleOnChangeIncognito={handleOnChangeIncognito} 
            />
            <CommentContent refreshComments={refreshComments} idComment={commentId} comments={comments} />
        </div>
    )
}