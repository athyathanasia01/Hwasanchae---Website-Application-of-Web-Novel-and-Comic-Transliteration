// technical
import Image from "next/image";
import { ChangeEvent } from "react";

// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// style
import style from "../../styles/secondContent/componentStyle/ListSocialMedia.module.scss";

type Props = {
    media: SocialMedia;
    handleOnChangeMedia: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ListSocialMedia({ media, handleOnChangeMedia }: Props) {
    return (
        <div className={style.mediaContent}>
            <Image 
                className={style.mediaContent__icon}
                src={media.logo ? media.logo.url : `/image/community_logo.png`} 
                alt={media.name} 
                width={40}
                height={40}
            />
            <input 
                className={style.mediaContent__input} 
                name={media.name} 
                type="text" 
                value={media.link ? media.link : ""} 
                onChange={(e) => handleOnChangeMedia(e)}
            />
        </div>
    )
}