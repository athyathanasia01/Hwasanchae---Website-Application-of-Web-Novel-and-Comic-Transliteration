"use client";

// technical
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";

// components
import ListItem from "../../modalComponentStyle/listItem";
import Button from "../../modalComponentStyle/button";
import Loading from "../../../../loading";

// template
import { IncognitoProfile } from "@hwasanchae/app/template/other/username" // ✅ 
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 

// style
import style from "../../modalComponentStyle/styles/Content.module.scss";

async function getIncognitoList() {
    try {
        const response = await fetch(`/api/hwasanchae/incognito`, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-cache'
        });
        const responseData = await response.json();
        const data = responseData.data as IncognitoProfile[];

        return data ?? [];
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get incognito list: ${error}`);

        return [];
    }
}

export default function IncognitoContent() {
    const [incognito, setIncognito] = useState<IncognitoProfile[]>([]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const listProfile = await getIncognitoList();
            setTimeout(() => {
                if (listProfile.length !== 0) {
                    setIncognito(listProfile);
                }

                setIsLoading(false);
            }, 1000)
        }

        loadData();
    }, []);

    async function handleAddIncognitoProfile() {
        setIsLoading(true);
        try {
            const updatedProfileList = [...incognito, {profile: null, username: `` }];
            setIncognito(updatedProfileList);

            await fetch(`/api/hwasanchae`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ col: "incognito", value: updatedProfileList })
            });

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error add new incognito profile: ${error}`);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    function handleOnClickProfile(index: number) {
        inputRefs.current[index]?.click();
    }

    async function uploadProfileIncognito(profile: Preview, index: number) {
        try {
            const prevPubId = incognito[index].profile?.publicId;
            const updatedList = incognito.map((incog, i) => (
                i === index ? { ...incog, profile: {url: profile.url, publicId: profile.publicId} } : incog
            ));
            setIncognito(updatedList);
    
            await fetch(`/api/hwasanchae`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ col: 'incognito', value: updatedList, prevPubId: prevPubId })
            });
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error upload profile incognito: ${error}`);
        }
    }
    
    async function uploadImageIncognito(file: File) {
        const formData = new FormData();
    
        formData.append("file", file);
        formData.append("upload_preset", "profile_upload");
        formData.append("folder", "profile");
    
        const urlLink = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_IMAGE_LINK!;
    
        try {
            const response = await fetch(urlLink, {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
    
            return {
                url: responseData.secure_url,
                publicId: responseData.public_id
            }
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error upload image incognito: ${error}`);
        }
    }
    
    function handleOnChangeName(index: number, e: ChangeEvent<HTMLInputElement>) {
        setIncognito((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, username: e.target.value } : item
            )
        );
    }
    
    async function handleOnChangeProfile(index: number, e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
    
        setIsLoading(true);
        try {
            const cloudUrl = await uploadImageIncognito(file);
            await uploadProfileIncognito(cloudUrl as Preview, index);
    
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error change profile: ${error}`);
    
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }
    
    async function handleRemoveProfile(index: number) {
        setIsLoading(true);
        try {
            const prevPubId = incognito[index].profile?.publicId;
            const updatedList = incognito.filter((_, i) => i !== index);
            setIncognito(updatedList);
    
            await fetch(`/api/hwasanchae`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ col: "incognito", value: updatedList, prevPubId: prevPubId })
            });
                
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error remove incognito profile: ${error}`);
    
            setTimeout(() => {
                setIsLoading(false);
            }, 100);
        }
    }
    
    function handleBackButton() {
        router.back();
    }
    
    async function handleUpdateButton() {
        setIsLoading(true);
        try {
            await fetch(`/api/hwasanchae`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ col: 'incognito', value: incognito })
            });
    
            setTimeout(() => {
                setIsLoading(false);
                router.back();
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error update incognito profile: ${error}`);
    
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    return (
        <div className={`${style.contentPage} ${style[`contentPage--modal`]}`}>
            <div className={style.contentPage__top}>
                <span className={style.contentPage__top__title}>Incognito Profile</span>
                <button className={style.contentPage__top__buttonAdd} onClick={handleAddIncognitoProfile}>Add New</button>
            </div>
            {isLoading ? 
                    <Loading />
                :
                    <ul className={style.contentPage__unorderList}>
                        {incognito.map((incog, index) => (
                            <ListItem 
                                key={index}
                                name={incog.username} 
                                profile={incog.profile ? incog.profile.url : `/image/profile_avatar.jpg`} 
                                inputRef={el => { inputRefs.current[index] = el }}
                                handleOnClickProfile={() => handleOnClickProfile(index)} 
                                handleOnChangeProfile={(e) => handleOnChangeProfile(index, e)} 
                                handleOnChangeName={(e) => handleOnChangeName(index, e)} 
                                removeProfile={() => handleRemoveProfile(index)}
                            />
                        ))}
                    </ul>
            }
            <div className={style.contentPage__buttonContainer}>
                <Button 
                    onClick={handleBackButton} 
                    color="black" 
                    name="Back" 
                    loading={isLoading}
                />
                <Button 
                    onClick={handleUpdateButton} 
                    color="pink" 
                    name="Update" 
                    loading={isLoading}
                />
            </div>
        </div>
    )
}