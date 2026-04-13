"use client";

// technical
import { useEffect, useState } from "react";

// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 

// components
import InputText from "./components/inputText";
import TitleContent from "./components/titleContent";

// style
import style from "../styles/sixthContent/SixthContent.module.scss";

export default function SixthContent() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getData(col: string) {
        try {
            const response = await fetch(`/api/hwasanchae/${col}`, {
                cache: "no-store"
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
        setIsLoading(true);
        setTimeout(async () => {
            const donates = await getData("donationList");
            setDonations(donates ?? []);

            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <div className={style.sixthContent}>
            {isLoading ?
                    Array.from({ length: 3 }).map((_, index) => (
                        <div className={style.sixthContentLoad__donateList} key={index}>
                            <div className={style.sixthContentLoad__donateList__titleSpace}>
                                <div className={style.sixthContentLoad__donateList__titleSpace__icon}></div>
                                <div className={style.sixthContentLoad__donateList__titleSpace__title}></div>
                            </div>
                            <div className={style.sixthContentLoad__donateList__inputSpace}></div>
                        </div>
                    ))
                :
                    donations.map((donate, index) => (
                        <div key={index} className={style.sixthContent__donateList}>
                            <TitleContent title={donate.name} image={donate.logo?.url} />
                            <InputText title={donate.name} value={donate.link} />
                        </div>
                    ))
            }
        </div>
    )
}