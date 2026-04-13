"use client";

// technical
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// components
import ListItem from "../components/fifthContent/components/listItem";
import Button from "../modalComponentStyle/button";
import Loading from "../../../loading";

// style
import style from "../modalComponentStyle/styles/Content.module.scss";

async function getDataCommunity() {
    try {
        const response = await fetch(`/api/hwasanchae/communityList`, {
            cache: "no-store"
        });
        const responseData = await response.json();
        const data = responseData.data as SocialMedia[];

        return data;
    } catch (error) {
        alert(`Error: ${error}`)
        console.log(`Error get hwasanchae data: ${error}`);

        return [];
    }
}

export default function CommunityContent() {
    const [communities, setCommunities] = useState<SocialMedia[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const communityList = await getDataCommunity();
            setTimeout(() => {
                setCommunities(communityList);
                setIsLoading(false);
            }, 1000);
        }

        loadData();
    }, []);

    function handleOnChangeLink(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        setCommunities(prev => prev.map((com, i) => (
            i === index ? { ...com, link: e.target.value } : com
        )));
    }

    function handleBackButton() {
        router.back();
    }

    async function handleUpdateButton() {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/hwasanchae`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ col: "communityList", value: communities })
            });
    
            setTimeout(() => {
                setIsLoading(false);
                if (response.status === 200) {
                    router.back();
                };
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);
            setTimeout(() => {
                setIsLoading(false);
            })
        }
    }

    return (
        <div className={`${style.contentPage} ${style[`contentPage--default`]}`}>
            <span className={style.contentPage__top__title}>Community List</span>
            {isLoading ?
                    <Loading />
                :
                    <ul className={style.contentPage__unorderList}>
                        {communities.map((community, index) => (
                            <ListItem key={index} name={community.name} icon={community.logo} link={community.link} disabled={false} handleOnChangeLink={(e) => handleOnChangeLink(e, index)} />
                        ))}
                    </ul>
            }
            <div className={style.contentPage__buttonContainer}>
                <Button name="Back" color="black" onClick={handleBackButton} loading={isLoading} />
                <Button name="Update" color="pink" onClick={handleUpdateButton} loading={isLoading} />
            </div>
        </div>
    )
}