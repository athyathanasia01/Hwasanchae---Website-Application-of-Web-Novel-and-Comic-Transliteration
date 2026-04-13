"use client"

// technical
import { ChangeEvent } from "react"

// components
import ListSocialMedia from "./components/listSocialMedia";

// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia" // ✅ 

// style
import style from "../styles/secondContent/SecondContent.module.scss";

type Props = {
    socialMedia: SocialMedia[];
    handleOnChangeMedia?: (index: number, e: ChangeEvent<HTMLInputElement>) => void | null;
    loadingState: boolean;
}

export default function SecondContent({ socialMedia, handleOnChangeMedia, loadingState }: Props) {
    return loadingState ?
            <div className={style.secondContentLoad}>
                <div className={style.secondContentLoad__title}></div>
                <ul className={style.secondContentLoad__unorderListLoad}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div className={style.secondContentLoad__unorderListLoad__list} key={index}></div>
                    ))}
                </ul>
            </div>
        :
            <div className={style.secondContent}>
                <span className={style.secondContent__title}>Follow my social media!</span>
                <ul className={style.secondContent__unorderList}>
                    {socialMedia.map((media, index) => (
                        <ListSocialMedia key={index} media={media} handleOnChangeMedia={(e) => handleOnChangeMedia?.(index, e)}/>
                    ))}
                </ul>
            </div>
}