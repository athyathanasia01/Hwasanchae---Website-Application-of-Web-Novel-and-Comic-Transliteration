"use client"

// technical
import { ChangeEvent, useEffect, useState } from "react";

// components
import InputData from "./inputData";
import SecondContent from "@hwasanchae/app/admin/profile/components/secondContent/content";

// template
import { Developer } from "@hwasanchae/app/template/other/developer"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// style
import style from "../../../admin/profile/components/styles/Content.module.scss";

async function getDevData() {
    try {
        const response = await fetch(`/api/developer`, {
            cache: "no-store"
        });
        const responseData = await response.json();
        const data = responseData.data as Developer;

        return data;
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get developer data: ${error}`);

        return null;
    }
}

export default function Content() {
    const [copyrightName, setCopyrightName] = useState<string>("");
    const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const data = await getDevData();
            if (data) {
                setCopyrightName(data.copyrightName);
                setSocialMedia(data.contact);
            }

            setIsLoading(false);
        }

        loadData();
    }, [])

    function handleOnChangeCopyright(e: ChangeEvent<HTMLInputElement>) {
        setCopyrightName(e.target.value);
    }

    function handleOnChangeMedia(index: number, e: ChangeEvent<HTMLInputElement>) {
        setSocialMedia(prev => 
            prev.map((item, i) => 
                i === index 
                    ?
                        {
                            ...item,
                            link: e.target.value !== "" ? e.target.value : null
                        }
                    :
                        item
            )
        )
    }

    async function handleOnSaveChanges() {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/developer`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ copyrightName: copyrightName, contact: socialMedia })
            });
            const responseData = await response.json();
            
            setIsLoading(false);
            if (response.status === 200) {
                return;
            } else {
                alert(`Error: ${responseData.message}`);
            }
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error update data: ${error}`);

            setIsLoading(false);
            return;
        }
    }

    return (
        <div className={style.content}>
            <InputData copyright={copyrightName} handleOnChangeCopyright={handleOnChangeCopyright} />
            <SecondContent socialMedia={socialMedia} handleOnChangeMedia={handleOnChangeMedia} loadingState={isLoading} />
            <button className={style.content__btnSave} onClick={handleOnSaveChanges}>Save Changes</button>
        </div>
    )
}