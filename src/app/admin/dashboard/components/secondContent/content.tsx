"use client";

// technical
import { useEffect, useState } from "react";

// style
import style from "../styles/secondContent/SecondContent.module.scss";

export default function SecondContent() {
    const [fyiList, setFyiList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getData(col: string) {
        try {
            const response = await fetch(`/api/hwasanchae/${col}`, {
                cache: "no-store"
            });
            const data = await response.json();
            const result = data.data as string[];

            return result;
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error get fyi list`);

            return [];
        }
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const fyi = await getData("fyiList");

            setTimeout(() => {
                setIsLoading(false);
                setFyiList(fyi ?? []);
            }, 1000);
        }

        fetchData();
    }, []);

    return isLoading ?
            <ul className={style.unorderListLoad}>
                {Array.from({ length: 3 }, () => Math.floor(Math.random() * 100)).map((_, index) => (
                    <li key={index} className={style.unorderListLoad__list}></li>
                ))}
            </ul>
        :
            <ul className={style.unorderList}>
                {fyiList.map((fyi, index) => (
                    <li key={index} className={style.unorderList__list}>{fyi}</li>
                ))}
            </ul>
}