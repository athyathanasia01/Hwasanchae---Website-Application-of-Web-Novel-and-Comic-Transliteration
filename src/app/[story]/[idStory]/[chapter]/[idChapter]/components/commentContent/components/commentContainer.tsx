"use client";

// technical
import React, { useEffect, useState } from "react";
import Image from "next/image"

// style
import style from "../../styles/commentContent/componentStyle/CommentContainer.module.scss";

type Props = {
    profile?: string | null;
    username: string;
    comment: string;
    totalReplies?: number;
    peak: "edge" | "leaf";
    leafComment?: string;
    addLeafComment?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sendLeafComment?: () => void;
    handleOnClickSeeReply?: () => void;
    seeReply?: string;
    onClickProfile?: () => void;
}

export default function CommentContainer(
    {
        profile,
        username,
        comment,
        totalReplies,
        peak,
        leafComment,
        addLeafComment,
        sendLeafComment,
        handleOnClickSeeReply,
        seeReply,
        onClickProfile
    }: Props
) {
    const [displayReply, setDisplayReply] = useState<"hidden" | "appear">("hidden");
    const [displayButton, setDisplayButton] = useState<"hidden" | "appear">("appear");
    const [color, setColor] = useState<string>("#303030");

    function getColorFromString(str: string) {
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        // generate HSL
        const hue = hash % 360;

        const saturation = 45;
        const lightness = 60;  

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    useEffect(() => {
        setColor(getColorFromString(username));
    }, [username]);

    function handleOnClickButtonReply() {
        setDisplayButton("hidden");
        setDisplayReply("appear");
    }

    function handleOnClickCancelButton() {
        setDisplayButton("appear");
        setDisplayReply("hidden");
    }

    return (
        <div className={`${style.commentContainer} ${style[`commentContainer--${peak}`]}`}>
            {profile ?
                <Image 
                    className={style.commentContainer__profile}
                    src={profile ? profile : "/image/profile_avatar.png"} 
                    alt={username ? username : "User Account"} 
                    width={40}
                    height={40}
                />
            :
                <div className={style.commentContainer__profileContainer} style={{ backgroundColor: color }}>
                    <div className={style.commentContainer__profileContainer__profile}>{username.charAt(0).toUpperCase()}</div>
                </div>
            }
            <div className={style.commentContainer__commentSect}>
                <div className={style.commentContainer__commentSect__content}>
                    <span className={style.commentContainer__commentSect__content__username} style={onClickProfile && { textDecoration: `underline`, cursor: `pointer` }} onClick={onClickProfile}>{username ? username : "User Account"}</span>
                    <span className={style.commentContainer__commentSect__content__comment}>{comment}</span>
                </div>
                <div className={`${style.commentContainer__commentSect__replyContainer} ${style[`commentContainer__commentSect__replyContainer--${peak}`]}`}>
                    <div className={`${style.commentContainer__commentSect__replyContainer__reply} ${style[`commentContainer__commentSect__replyContainer__reply--${displayReply}`]}`}>
                        <button className={style.commentContainer__commentSect__replyContainer__reply__btnCancel} onClick={handleOnClickCancelButton}>X</button>
                        <input type="text" value={leafComment} onChange={(e) => addLeafComment?.(e)} className={style.commentContainer__commentSect__replyContainer__reply__input} placeholder="add comment..." />
                        <button className={style.commentContainer__commentSect__replyContainer__reply__btnSend} onClick={sendLeafComment}>send</button>
                    </div>
                    <div className={style.commentContainer__commentSect__replyContainer__detail}>
                        <span className={`${style.commentContainer__commentSect__replyContainer__detail__seeReply} ${style[`commentContainer__commentSect__replyContainer__detail__seeReply--${totalReplies === 0 ? 'hidden' : 'appear'}`]}`} onClick={handleOnClickSeeReply}>{seeReply === 'appear' ? `see ${totalReplies} replies` : `hide ${totalReplies} replies`}</span>
                        <span className={`${style.commentContainer__commentSect__replyContainer__detail__reply} ${style[`commentContainer__commentSect__replyContainer__detail__reply--${displayButton}`]}`} onClick={handleOnClickButtonReply}>reply ↩</span>
                    </div>
                </div>
            </div>
        </div>
    )
}