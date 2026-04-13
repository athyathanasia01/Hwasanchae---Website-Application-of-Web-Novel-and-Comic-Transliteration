// technical
import Image from "next/image";
import React from "react";

// template
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile" // ✅ 

// style
import style from "../../styles/fifthContent/componentStyle/ListItem.module.scss";

type Props = {
    icon: Preview | null;
    link: string | null;
    name: string;
    disabled: boolean;
    handleOnChangeLink?: (e: React.ChangeEvent<HTMLInputElement>) => void | null;
}

export default function ListItem({ icon, name, link, disabled, handleOnChangeLink }: Props) {
    return (
        <div className={style.listItem}>
            <Image 
                src={icon ? icon.url : "/image/community_logo.png"} 
                alt={`${name}'s logo`}
                width={32}
                height={32}
                className={style.listItem__icon}            
            />
            <input 
                type="text" 
                className={style.listItem__input}
                value={link ? link : ""}
                disabled={disabled}
                onChange={(e) => handleOnChangeLink?.(e)}
            />
        </div>
    )
}