"use client";

// technical
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// components
import CommentContainer from "./commentContainer";

// template 
import { CommentData } from "@hwasanchae/app/template/story/comment"; // ✅ 

// style
import style from "../../styles/commentContent/componentStyle/CommentContent.module.scss";

type Props = {
    comment: CommentData;
    idComment: string;
    refreshComments: () => Promise<void>;
}

export default function CommentItem({ idComment, comment, refreshComments }: Props) {
    const [seeReply, setSeeReply] = useState(false);
    const [replyText, setReplyText] = useState("");
    const { push } = useRouter();

    function handleSeeReply() {
        setSeeReply(prev => !prev);
    }

    function handleOnChangeInputReply(e: React.ChangeEvent<HTMLInputElement>) {
        setReplyText(e.target.value);
    }

    async function handleReplySubmit() {
        if (replyText === "") {
            alert(`Comment must have minimal 1 characters`);
            return;
        }

        try {
            if (idComment) {
                const params = new URLSearchParams({
                    idComment: idComment,
                    idEdge: comment.id
                });

                let url = `/api/comment`;
                if (params) {
                    url += `?${params.toString()}`;
                }

                const incognito = false;

                await fetch(url, {
                    method: `PUT`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment: replyText, incognito })
                });

                refreshComments();
                setReplyText("");
                setSeeReply(true);
            } else {
                alert(`Comment ID doesn't set up`);
            }
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error submit new comment: ${error}`);
        }
    }

    function onClickProfile(idUser: string | null | undefined) {
        if (!idUser) return;
        console.log({ idUser });

        push(`/profile/${idUser}`);
    }

    return (
        <li key={comment.id}>
            <CommentContainer 
                profile={comment.profile ? comment.profile?.url : null}
                username={comment.username} 
                comment={comment.comment} 
                peak={"edge"}
                handleOnClickSeeReply={handleSeeReply}
                seeReply={seeReply ? "hidden" : "appear"}
                totalReplies={comment.replies?.length ?? 0}
                leafComment={replyText}
                addLeafComment={handleOnChangeInputReply}
                sendLeafComment={handleReplySubmit}
                onClickProfile={() => onClickProfile(comment.userId)}
            />

            {comment.replies && comment.replies.length > 0 && (
                <ul className={`${style.commentListContainer__listComment__listReply} ${style[`commentListContainer__listComment__listReply--${seeReply ? 'appear' : 'hidden'}`]}`}>
                    {comment.replies.map(reply => (
                        <li key={reply.id}>
                            <CommentContainer 
                                profile={reply.profile ? reply.profile.url : null}
                                username={reply.username} 
                                comment={reply.comment} 
                                peak={"leaf"} 
                                onClickProfile={() => onClickProfile(reply.userId)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}