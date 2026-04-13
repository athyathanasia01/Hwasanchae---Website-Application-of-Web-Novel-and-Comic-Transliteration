"use client"

// technical 
import { ChangeEvent, useEffect, useRef, useState } from "react";

// components
import AboutMe from "./components/aboutMe";
import ImageUploader from "./components/imageUploader";

// template
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 
import { HwasanchaeData } from "@hwasanchae/app/template/hwasanchae/hwasanchae"; // ✅ 

// style
import style from "../styles/firstContent/FirstContent.module.scss";

export default function FirstContent() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<Preview | null>(null);
    const [about, setAbout] = useState<string>("");
    const [copyrightName, setCopyrightName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
    const [isLoadingCopyright, setIsLoadingCopyright] = useState<boolean>(false);

    async function getHwasanchaeData() {
        try {
            const response = await fetch(`/api/hwasanchae`, {
                cache: "no-store"
            });
            const responseData = await response.json();
            const data = responseData.data as HwasanchaeData;

            return data;
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error get hwasanchae data: ${error}`);

            return null;
        }
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const hwasanchaeData = await getHwasanchaeData();
            if (hwasanchaeData) {
                const profile = hwasanchaeData.profile;
                const aboutMe = hwasanchaeData.about;
                const copyright = hwasanchaeData.copyrightName;

                setPreview(profile ?? null);
                setAbout(aboutMe ?? "");
                setCopyrightName(copyright ?? "");
            }

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }

        fetchData();
    }, []);

    function handleClickPreview() {
        inputRef.current?.click();
    }

    async function uploadProfile(profile: Preview) {
        try {
            const response = await fetch(`/api/hwasanchae`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ col: "profile", value: profile, prevPubId: preview ? preview.publicId : null })
            });

            if (response.status === 200) {
                setPreview(profile);
            };
        } catch (error) {
            alert(`Error: ${error}`);
        }
    }

    async function uploadImageProfile(file: File) {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "profile_upload");
        formData.append("folder", "profile");

        const urlLink = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_IMAGE_LINK!;

        try {
            const result = await fetch(urlLink, {
                method: "POST",
                body: formData
            });

            const data = await result.json();

            return {
                url: data.secure_url,
                publicId: data.public_id
            };
        } catch (error) {
            alert(`Error: ${error}`);
        }
    }

    async function handleChangePreview(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoadingProfile(true);
        try {
            const cloudUrl = await uploadImageProfile(file);
            await uploadProfile(cloudUrl as Preview);

            setIsLoadingProfile(false);
        } catch (error) {
            console.log(error);

            setIsLoadingProfile(false);
        }
    }

    function handleOnChangeCopyright(e: ChangeEvent<HTMLInputElement>) {
        setCopyrightName(e.target.value);    
    }

    async function handleOnClickCopyright() {
        setIsLoadingCopyright(true);
        try {
            const response = await fetch(`/api/hwasanchae`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ col: `copyrightName`, value: copyrightName, prevPubId: null })
            });
            
            setTimeout(() => {
                setIsLoadingCopyright(false);
            }, 1000);

            if (response.status === 200) return;
            else return;
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error edit data copyright name: ${error}`);

            setIsLoadingCopyright(false);
            return;
        }
    }

    return isLoading ?
            <div className={style.skeletonLoad}>
                <div className={style.skeletonLoad__avatarWrapper}></div>
                <div className={style.skeletonLoad__aboutme}>
                    <div className={style.skeletonLoad__aboutme__name}>
                        <span className={style.skeletonLoad__aboutme__name__title}>Copyright Name</span>
                        <div className={style.skeletonLoad__aboutme__name__input}></div>
                    </div>
                    <div className={style.skeletonLoad__aboutme__about}>
                        <span className={style.skeletonLoad__aboutme__about__title}>About Me</span>
                        <div className={style.skeletonLoad__aboutme__about__input}></div>
                    </div>
                </div>
            </div>
        :
            <div className={style.firstContent}>
                {isLoadingProfile ?
                        <div className={style.skeletonLoad__avatarWrapper}></div>
                    :
                        <ImageUploader 
                            inputRef={inputRef} 
                            preview={preview?.url ?? "/image/profile_avatar.jpg"} 
                            handleClickPreview={handleClickPreview} 
                            handleChangePreview={handleChangePreview} 
                        />
                }
                <AboutMe 
                    aboutme={about} 
                    copyrightName={copyrightName} 
                    isLoadingCopyright={isLoadingCopyright}
                    handleOnChangeCopyright={(e) => handleOnChangeCopyright(e)} 
                    handleOnClickCopyright={handleOnClickCopyright}
                />
            </div>
}