"use client";

// technical
import { ChangeEvent, useEffect, useRef, useState } from "react";

// components
import FirstContent from "@hwasanchae/app/admin/profile/components/firstContent/content";
import SecondContent from "@hwasanchae/app/admin/profile/components/secondContent/content";

// template
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅
import { UserData } from "@hwasanchae/app/template/other/username"; // ✅ 

// style
import style from "../../admin/profile/components/styles/Content.module.scss";

async function getUserData() {
    try {
        let url = `/api/auth/user`;
        const response = await fetch(url, {
            cache: "no-store"
        });

        const data = await response.json();
        const result = data.data as UserData;

        return result;
    } catch (error: any) {
        alert(`Error: ${error}`);
        console.log(`Error get user data: ${error.message}`);

        return null;
    }
}

export default function Content() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<Preview | null>(null);
    const [about, setAbout] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setIsLoadingPreview(true);
            const data = await getUserData();
            if (data) {
                const profile = data.profile;
                const about = data.about;
                const username = data.username;
                const media = data.media;

                setPreview(profile ?? null);
                setAbout(about ?? "");
                setUsername(username ?? "");
                setSocialMedia(media ?? []);

                setTimeout(() => {
                    setIsLoading(false);
                    setIsLoadingPreview(false);
                }, 1000);
            }
        }

        fetchData();
    }, []);

    function handleClickPreview() {
        inputRef.current?.click();
    }

    async function uploadProfile(profile: Preview) {
        try {
            const response = await fetch(`/api/auth/user`, {
                method: `PUT`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ col: "profile", data: profile, prevPubId: preview ? preview.publicId : null })
            });

            if (response.status === 200) {
                setPreview(profile);
            };
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error upload profile data: ${error}`);
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

        setIsLoadingPreview(true);
        try {
            const cloudUrl = await uploadImageProfile(file);
            await uploadProfile(cloudUrl as Preview);

            setTimeout(() => {
                setIsLoadingPreview(false);
            }, 1000);
        } catch (error) {
            console.log(error);

            setTimeout(() => {
                setIsLoadingPreview(false);
            }, 1000);
        }
    }

    function handleOnChangeUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);    
    }

    function handleOnChangeAbout(e: ChangeEvent<HTMLTextAreaElement>) {
        setAbout(e.target.value);
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
        setIsLoadingPreview(true);
        try {
            const data = [
                {
                    col: `username`,
                    data: username
                },
                {
                    col: `about`,
                    data: about !== "" ? about : null
                },
                {
                    col: `media`,
                    data: socialMedia
                }
            ]

            for (const dt of data) {
                await fetch(`/api/auth/user`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        col: dt.col,
                        data: dt.data
                    })
                });
            }

            setTimeout(() => {
                setIsLoading(false);
                setIsLoadingPreview(false);
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error update data: ${error}`);
        }
    }
    
    return (
        <div className={style.content}>
            <FirstContent 
                inputRef={inputRef}
                preview={preview}
                handleClickPreview={handleClickPreview}
                handleChangePreview={(e) => handleChangePreview(e)}
                about={about}
                username={username}
                handleOnChangeUsername={(e) => handleOnChangeUsername(e)}
                handleOnChangeAbout={(e) => handleOnChangeAbout(e)} 
                loadingStatePreview={isLoadingPreview} 
                loadingState={isLoading}            
            />
            <SecondContent 
                socialMedia={socialMedia}
                handleOnChangeMedia={(index: number, e) => handleOnChangeMedia(index, e)} 
                loadingState={isLoading}            
            />
            <button className={style.content__btnSave} onClick={handleOnSaveChanges}>Save Changes</button>
        </div>
    )
}