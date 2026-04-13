"use client";

// technical
import { useEffect, useState } from "react";

// template
import { MoreLess } from "@hwasanchae/app/template/variants"; // ✅ 
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 
import { HwasanchaeData } from "@hwasanchae/app/template/hwasanchae/hwasanchae"; // ✅ 

// components
import LeftContent from "./leftContent/content";
import RightContent from "./rightContent/content";

// style
import style from "../styles/secondContent/Content.module.scss";

type Props = {
    data: NewStoryDetail;
    hwasanchae: HwasanchaeData;
}

export default function SecondContent({ data, hwasanchae }: Props) {
    const [summary, setSummary] = useState<string>("");
    const [more, setMore] = useState<Boolean>(true);
    const [textmore, setTextMore] = useState<MoreLess>("See More");
    const [bookmark, setBookmark] = useState<Boolean>(false);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [communities, setCommunities] = useState<SocialMedia[]>([]);

    useEffect(() => {
        const storySummary = data.summary;
        const storyBookmark = data.isBookmark;
        const filteredDonation = hwasanchae.donationList.filter(donate => donate.link);
        const filteredCommunity = hwasanchae.communityList.filter(community => community.link);

        setSummary(storySummary);
        setBookmark(storyBookmark);
        setDonations(filteredDonation);
        setCommunities(filteredCommunity);
    }, [data, hwasanchae]);

    function handleSeeMoreLess() {
        if (!more) {
            setTextMore("See More");
        } else {
            setTextMore("See Less");
        }

        setMore(!more);
    }

    function handleBookmark() {
        const bookmarks = localStorage.getItem("bookmarks");
        const bookmarkList: string[] = bookmarks ? JSON.parse(bookmarks) : [];

        const updatedListBookmark = bookmarkList.includes(data.id) 
            ? bookmarkList.filter((bookmark) => bookmark !== data.id)
            : [...bookmarkList, data.id];
        
        localStorage.setItem("bookmarks", JSON.stringify(updatedListBookmark));

        setBookmark(!bookmark);
    }

    return (
        <div className={style.secondContent}>
            <LeftContent 
                summary={summary} 
                textMore={textmore} 
                handleClickMore={handleSeeMoreLess} 
                condition={more ? "less" : "more"} 
            />
            <RightContent 
                handleOnClickBookmark={handleBookmark} 
                isBookmarked={bookmark} 
                donations={donations} 
                communities={communities} 
            />
        </div>
    )
}