"use client";

// technical
import { useEffect, useState } from "react";

// style
import style from "../../../styles/bottomContent/rightContent/componentStyle/BottomButtonContainer.module.scss";

type Props = {
    prevChapter?: string;
    handleOnClickPrev?: () => void;
    nextChapter?: string;
    handleOnClickNext?: () => void;
}

export default function BottomButtonContainer(
    {
        prevChapter,
        handleOnClickPrev,
        nextChapter,
        handleOnClickNext
    }: Props
) {
    const [prevCondition, setPrevCondition] = useState<string>("");
    const [nextCondition, setNextCondition] = useState<string>("");

    useEffect(() => {
        setPrevCondition(prevChapter ? "active" : "inactive");
        setNextCondition(nextChapter ? "active" : "inactive");
    }, [prevChapter, nextChapter]);

    return (
        <div className={style.bottomButtonContainer}>
            <button className={`${style.bottomButtonContainer__button} ${style[`bottomButtonContainer__button--${prevCondition}`]}`} onClick={handleOnClickPrev} disabled={prevCondition === "inactive"}>
                <span className={style.bottomButtonContainer__button__textTop}>Previous Chapter</span>
                <span className={style.bottomButtonContainer__button__textBottom}>{prevChapter ? prevChapter : ""}</span>
            </button>
            <button className={`${style.bottomButtonContainer__button} ${style[`bottomButtonContainer__button--${nextCondition}`]}`} onClick={handleOnClickNext} disabled={nextCondition === "inactive"}>
                <span className={style.bottomButtonContainer__button__textTop}>Next Chapter</span>
                <span className={style.bottomButtonContainer__button__textBottom}>{nextChapter ? nextChapter : ""}</span>
            </button>
        </div>
    )
}