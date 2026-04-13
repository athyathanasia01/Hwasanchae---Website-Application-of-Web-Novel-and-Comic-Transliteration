"use client";

// technical
import { useEffect, useState } from "react";

// template
import { QuoteItem } from "@hwasanchae/app/template/hwasanchae/quote"; // ✅ 

// components
import Quote from "./components/quote";

// style
import style from "../styles/thirdContent/ThirdContent.module.scss";

export default function ThirdContent() {
    const [seeMore, setSeeMore] = useState(false);
    const [allQuotes, setAllQuotes] = useState<QuoteItem[]>([]);
    const [random3Quotes, setRandom3Quotes] = useState<QuoteItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getData(col: string) {
        try {
            const response = await fetch(`/api/hwasanchae/${col}`, {
                cache: "no-store"
            });
            const data = await response.json();
            const result = data.data as QuoteItem[];

            return result;
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error get quote list data: ${error}`);

            return [];
        }
    }

    useEffect(() => {
        setIsLoading(true);

        setTimeout(async () => {
            const quotes = await getData("quoteList");
            setAllQuotes(quotes);
            
            const randomQuotes = quotes ? [...quotes]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3) : [];

            setRandom3Quotes(randomQuotes);

            setIsLoading(false);
        }, 1000);
    }, []);

    const quotes = seeMore ? allQuotes : random3Quotes;

    return (
        <div className={style.thirdContent}>
            {isLoading ?
                    <ul className={style.thirdContent__unorderListLoad}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div className={style.thirdContent__unorderListLoad__quoteContainerLoad} key={index}>
                                <div className={style.thirdContent__unorderListLoad__quoteContainerLoad__quote}></div>
                                <div className={style.thirdContent__unorderListLoad__quoteContainerLoad__name}></div>
                            </div>
                        ))}
                    </ul>
                :
                    <>
                        <ul className={style.thirdContent__unorderList}>
                            {quotes?.map((quote, index) => (
                                <Quote name={quote.person} quote={quote.quote} key={index} />
                            ))}
                        </ul>
                        <span 
                            className={style.thirdContent__more} 
                            onClick={() => setSeeMore(!seeMore)}
                        >
                            {seeMore ? "see less" : "see more"}
                        </span>
                    </>
            }
        </div>
    )
}