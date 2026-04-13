"use client";

// technical
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";

// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 

// components
import Image from "next/image"
import Input from "../../modalComponentStyle/input";
import Button from "../../modalComponentStyle/button";
import Loading from "../../../../loading";

// style
import style from "../../modalComponentStyle/styles/Content.module.scss";

export default function DonatesContent() {
    const [donates, setDonates] = useState<Donation[]>([]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    async function getDataDonation() {
        try {
            const response = await fetch(`/api/hwasanchae/donationList`, {
                method: `GET`
            });
            const data = await response.json();
            const result = data.data as Donation[];

            return result;
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error get donation list data: ${error}`);

            return [];
        }
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const donationList = await getDataDonation();

            setTimeout(() => {
                setDonates(donationList);
                setIsLoading(false);
            }, 1000);
        }

        fetchData();
    }, []);

    async function addDonate() {
        setIsLoading(true);
        try {
            const updatedList = [...donates, { logo: null, link: "", name: "" }];
            setDonates(updatedList);

            await fetch(`/api/hwasanchae`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ col: "donationList", value: updatedList })
            });

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);

            setIsLoading(false);
        }
    }

    async function removeDonate(index: number) {
        setIsLoading(true);
        try {
            const prevPubId = donates[index].logo?.publicId;
            const updatedList = donates.filter((_, i) => i !== index);
            setDonates(updatedList);

            await fetch(`/api/hwasanchae`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ col: "donationList", value: updatedList, prevPubId: prevPubId })
            });

            setTimeout(() => {
                setIsLoading(true);
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);

            setIsLoading(true);
        }
    }

    function handleOnClickLogo(index: number) {
        inputRefs.current[index]?.click();
    }

    async function uploadLogo(logo: Preview, index: number) {
        try {
            const prevPubId = donates[index].logo?.publicId;
            const updatedList = donates.map((donate, i) => (
                i === index ? { ...donate, logo: {url: logo.url, publicId: logo.publicId} } : donate
            ));
            setDonates(updatedList);
    
            await fetch(`/api/hwasanchae`, {
                method: `POST`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ col: "donationList", value: updatedList, prevPubId: prevPubId })
            });
        } catch (error) {
            alert(`Error upload logo: ${error}`);
        }
    }
    
    async function uploadImageLogo(file: File) {
        const formData = new FormData();
    
        formData.append("file", file);
        formData.append("upload_preset", "logo_upload");
        formData.append("folder", "logo");

        const urlLink = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_IMAGE_LINK!;
    
        try {
            const result = await fetch(urlLink, {
                method: 'POST',
                body: formData
            });
            const data = await result.json();
    
            return {
                url: data.secure_url,
                publicId: data.public_id
            }
    
        } catch (error) {
            alert(`Error: ${error}`);
        }
    }
    
    async function handleOnChangeLogo(e: ChangeEvent<HTMLInputElement>, index: number) {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        try {
            const cloudUrl = await uploadImageLogo(file);
            await uploadLogo(cloudUrl as Preview, index);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            alert(`Error: ${error}`);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    function handleOnChangeName(e: any, index: number) {
        setDonates(prev => prev.map((donate, i) => (
            i === index ? { ...donate, name: e.target.value } : donate
        )));
    }

    function handleOnChangeLink(e: any, index: number) {
        setDonates(prev => prev.map((donate, i) => (
            i === index ? { ...donate, link: e.target.value } : donate
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
                body: JSON.stringify({ col: "donationList", value: donates })
            });

            setTimeout(() => {
                setIsLoading(false);
                if (response.status === 200) {
                    router.back();
                };
            })
        } catch (error) {
            alert(`Error: ${error}`);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    return (
        <div className={`${style.contentPage} ${style[`contentPage--modal`]}`}>
            <div className={style.contentPage__top}>
                <span className={style.contentPage__top__title}>Donate's Link</span>
                <button className={style.contentPage__top__buttonAdd} onClick={addDonate}>Add New</button>
            </div>
            {isLoading ?
                    <Loading />
                :
                    <ul className={style.contentPage__unorderList}>
                        {donates.map((donate, index) => (
                            <li className={`${style.contentPage__unorderList__list} ${style[`contentPage__unorderList__list--donate`]}`} key={index}>
                                <div className={style.contentPage__unorderList__list__logoWrapper}>
                                    <Image
                                        src={donate.logo?.url ?? `/image/plus.png`}
                                        alt="add image logo"
                                        fill
                                        className={style.contentPage__unorderList__list__logoWrapper__logo}
                                        onClick={() => handleOnClickLogo(index)}
                                    />
                                                
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        ref={el => { inputRefs.current[index] = el }}
                                        onChange={(e) => handleOnChangeLogo(e, index)}
                                        hidden
                                    />
                                </div>
                                <div className={style.contentPage__unorderList__list__inputFlexContainer}>
                                    <Input title="name" value={donate.name} source="donate" setValue={(e) => handleOnChangeName(e, index)} />
                                    <Input title="link" value={donate.link} source="donate" setValue={(e) => handleOnChangeLink(e, index)} />
                                </div>
                                <svg onClick={() => removeDonate(index)} className={`${style.contentPage__unorderList__list__buttonDelete} ${style[`contentPage__unorderList__list__buttonDelete--donate`]}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Bin-1--Streamline-Ultimate" height="24" width="24">
                                    <desc>
                                        Bin 1 Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <g id="Bin-1--Streamline-Ultimate.svg">
                                        <path d="M19.45 7.5H4.55a0.5 0.5 0 0 0 -0.5 0.54l1.28 14.14a2 2 0 0 0 2 1.82h9.34a2 2 0 0 0 2 -1.82L20 8a0.5 0.5 0 0 0 -0.5 -0.54Zm-9.2 13a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Zm5 0a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Z" fill="#FFFFFF" strokeWidth="1"></path>
                                        <path d="M22 4h-4.75a0.25 0.25 0 0 1 -0.25 -0.25V2.5A2.5 2.5 0 0 0 14.5 0h-5A2.5 2.5 0 0 0 7 2.5v1.25a0.25 0.25 0 0 1 -0.25 0.25H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0 -2ZM9 3.75V2.5a0.5 0.5 0 0 1 0.5 -0.5h5a0.5 0.5 0 0 1 0.5 0.5v1.25a0.25 0.25 0 0 1 -0.25 0.25h-5.5A0.25 0.25 0 0 1 9 3.75Z" fill="#FFFFFF" strokeWidth="1"></path>
                                    </g>
                                </svg>
                            </li>
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