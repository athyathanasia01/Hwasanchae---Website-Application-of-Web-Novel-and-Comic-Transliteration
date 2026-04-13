"use client";
// technical
import { useEffect, useState } from "react";

// components
import ListItem from "./components/listItem";

// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// styles
import style from "../styles/fifthContent/FifthContent.module.scss";

export default function FifthContent() {
    const [community, setCommunity] = useState<SocialMedia[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getData(col: string) {
        try {
            const response = await fetch(`/api/hwasanchae/${col}`, {
                cache: "no-store"
            });
            const data = await response.json();
            const result = data.data as SocialMedia[];

            return result;
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error get community list data: ${error}`);

            return [];
        }
    }

    useEffect(() => {
        setIsLoading(true);

        setTimeout(async () => {
            const communityList = await getData("communityList");
            const filtered = communityList.filter((com) => com.link !== null);
            setCommunity(filtered ?? []);
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        isLoading ?
                <div className={style.fifthContentLoad}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div className={style.fifthContentLoad__listItemLoad} key={index}>
                            <div className={style.fifthContentLoad__listItemLoad__icon}></div>
                            <div className={style.fifthContentLoad__listItemLoad__input}></div>
                        </div>
                    ))}
                </div>
            :
                <div className={style.fifthContent}>
                    {community.map((com, index) => (
                        <ListItem key={index} name={com.name} icon={com.logo} link={com.link} disabled={true} />
                    ))}
                </div>
    )
}