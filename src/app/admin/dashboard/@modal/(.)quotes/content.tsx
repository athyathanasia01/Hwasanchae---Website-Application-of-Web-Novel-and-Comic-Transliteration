"use client";

// technical
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// template
import { QuoteItem } from "@hwasanchae/app/template/hwasanchae/quote"; // ✅ 

// components
import Input from "../../modalComponentStyle/input";
import TextArea from "../../modalComponentStyle/textarea";
import Button from "../../modalComponentStyle/button";
import Loading from "../../../../loading";

// style
import style from "../../modalComponentStyle/styles/Content.module.scss";

export default function QuotesContent() {
    const [quotes, setQuotes] = useState<QuoteItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    async function getDataQuote() {
        try {
            const response = await fetch(`/api/hwasanchae/quoteList`, {
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
        async function fetchData() {
            setIsLoading(true);
            const quoteList = await getDataQuote();

            setTimeout(() => {
                setQuotes(quoteList);
                setIsLoading(false);
            }, 1000);
        }

        fetchData();
    }, []);

    function addNewQuotes() {
        if (quotes.length == 10) {
            alert(`You have reach maximum quota of quotes. Please remove one to add new quote!`);
            return;
        }

        setQuotes(prev => [...prev, { quote: "", person: "" }]);
    }

    function deleteQuote(index: number) {
        setQuotes(prev => prev.filter((_, i) => i !== index));
    }

    function handleOnChangePerson(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        setQuotes(prev => 
            prev.map((quote, i) => (
                i === index ? {...quote, person: e.target.value} : quote
            ))
        )
    }

    function handleOnChangeQuote(value: string, index: number) {
        setQuotes(prev => 
            prev.map((quote, i) => (
                i === index ? {...quote, quote: value} : quote
            ))
        )
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
                body: JSON.stringify({ col: "quoteList", value: quotes })
            });

            if (response.status === 200) {
                setTimeout(() => {
                    setIsLoading(false);
                    router.back();
                }, 1000);
            };
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error update data: ${error}`);

            setIsLoading(false);
        }
    }

    return (
        <div className={`${style.contentPage} ${style[`contentPage--modal`]}`}>
            <div className={style.contentPage__top}>
                <span className={style.contentPage__top__title}>Your Quotes</span>
                <button className={style.contentPage__top__buttonAdd} onClick={addNewQuotes}>Add New</button>
            </div>
            {isLoading ?
                    <Loading/>
                :
                    <ul className={style.contentPage__unorderList}>
                        {quotes.map((quote, index) => (
                            <li key={index} className={`${style.contentPage__unorderList__list} ${style[`contentPage__unorderList__list--quote`]}`}>
                                <div className={style.contentPage__unorderList__list__inputContainer}>
                                    <Input title="Person" value={quote.person} setValue={(e) => handleOnChangePerson(e, index)} source="quote" />
                                    <TextArea placeholder="Quote" value={quote.quote} onChange={(e) => handleOnChangeQuote(e, index)} source="quote" />
                                </div>   
                                <svg onClick={() => deleteQuote(index)} className={style.contentPage__unorderList__list__buttonDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Bin-1--Streamline-Ultimate" height="24" width="24">
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