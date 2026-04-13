"use client";

// technical
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// components
import Button from "../modalComponentStyle/button";
import TextArea from "../modalComponentStyle/textarea";
import Loading from "../../../loading";

// style
import style from "../modalComponentStyle/styles/Content.module.scss";

export default function ContentPage() {
    const [aboutme, setAboutme] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    async function getDataAbout() {
        try {
            const response = await fetch(`/api/hwasanchae/about`, {
                cache: "no-store"
            });
            const data = await response.json();
            const result = data.data as string;

            return result;
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error get data about: ${error}`);
            return "";
        }
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const aboutMe = await getDataAbout();

            setAboutme(aboutMe);

            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }

        fetchData();
    }, []);

    function handleChangeAboutMe(e: any) {
        setAboutme(e.target.value);
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
                body: JSON.stringify({ col: "about", value: aboutme })
            });

            if (response.status === 200) {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);

                router.back();
            };
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error update data: ${error}`);

            setIsLoading(false);
        }
    }

    return (
        <div className={`${style.contentPage} ${style[`contentPage--default`]}`}>
            <div className={style.contentPage__top}>
                <span className={style.contentPage__top__title}>About Me</span>
            </div>
            {isLoading ?
                    <Loading />
                :
                    <>
                        <TextArea placeholder="about me" onChange={(e) => handleChangeAboutMe(e)} value={aboutme} source="aboutme" />
                    </>
            }
            
            <div className={style.contentPage__buttonContainer}>
                <Button name="Back" color="black" onClick={handleBackButton} loading={isLoading} />
                <Button name="Update" color="pink" onClick={handleUpdateButton} loading={isLoading} />
            </div>
        </div>
    )
} 