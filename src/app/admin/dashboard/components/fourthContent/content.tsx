"use client";

// technical
import { useEffect, useState } from "react"

// components
import ListItem from "./components/listItem";

// template
import { IncognitoProfile } from "@hwasanchae/app/template/other/username"; // ✅

// style
import style from "../styles/fourthContent/FourthContent.module.scss";

export default function FourthContent() {
    const [incognito, setIncognito] = useState<IncognitoProfile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getIncognitoList() {
        try {
            const response = await fetch(`/api/hwasanchae/incognito`, {
                cache: 'no-store'
            });
            const responseData = await response.json();
            const data = responseData.data as IncognitoProfile[];

            return data ?? [];
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error get incognito profile list: ${error}`);

            return [];
        }
    }

    useEffect(() => {
        setIsLoading(true);

        setTimeout(async () => {
            const listProfile = await getIncognitoList();
            if (listProfile.length !== 0) {
                setIncognito(listProfile);
            }

            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        isLoading ?
            <div className={style.fourthContentLoad}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <div className={style.fourthContentLoad__listItemLoad} key={index}>
                        <div className={style.fourthContentLoad__listItemLoad__profileContainer}></div>
                        <div className={style.fourthContentLoad__listItemLoad__username}></div>
                    </div>
                ))}
            </div>
        :
            <div className={style.fourthContent}>
                {incognito.map((incog, index) => (
                    <ListItem key={index} profile={incog.profile} name={incog.username} />
                ))}
            </div>
    )
}