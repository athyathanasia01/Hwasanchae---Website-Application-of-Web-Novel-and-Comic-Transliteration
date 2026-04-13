"use client";

// technical
import { useState } from "react";

// template
import { ConditionNavigation } from "@hwasanchae/app/template/variants"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { QuoteItem } from "@hwasanchae/app/template/hwasanchae/quote"; // ✅ 
import { NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 

// components
import LeftContent from "./leftContent/content";
import RightContent from "./rightContent/content";

// style
import style from "../styles/fourthContent/Content.module.scss";

type Props = {
    communityList: SocialMedia[];
    donationList: Donation[];
    randomQuote: QuoteItem;
    story: Omit<NewStoryDetail, 'isBookmark'>[];
}

export default function FourthContent({ communityList, donationList, randomQuote, story }: Props) {
    const [statusClose, setStatusClose] = useState<ConditionNavigation>("close");

    function handleStatusClose() {
        setStatusClose(statusClose === "close" ? "open" : "close");
    }
    return (
        <div className={style.fourthContent}>
            <LeftContent 
                statusClose={statusClose} 
                handleStatusClose={handleStatusClose}
                communityList={communityList}
                donationList={donationList}
                randomQuote={randomQuote}
            />
            <RightContent 
                statusClose={statusClose} 
                story={story}
            />
        </div>
    )
}