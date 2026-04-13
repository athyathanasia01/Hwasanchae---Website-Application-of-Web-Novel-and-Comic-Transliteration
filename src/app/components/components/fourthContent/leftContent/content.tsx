// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { QuoteItem } from "@hwasanchae/app/template/hwasanchae/quote"; // ✅ 
import { ConditionNavigation } from "@hwasanchae/app/template/variants"; // ✅ 

// components
import CommunityContent from "./components/communityContent";
import RandomQuoteContent from "./components/randomQuoteContent";
import SupportContent from "./components/supportContent";

// style 
import style from "../../styles/fourthContent/leftContent/Content.module.scss";

type Props = {
    statusClose: ConditionNavigation;
    handleStatusClose: () => void;
    donationList: Donation[];
    communityList: SocialMedia[];
    randomQuote: QuoteItem;
}

export default function LeftContent({ statusClose, handleStatusClose, donationList, communityList, randomQuote }: Props) {
    return (
        <div className={`${style.leftContent} ${style[`leftContent--${statusClose}`]}`}>
            <div className={style.leftContent__topContent}>
                <SupportContent donationList={donationList} color="white" />
                <CommunityContent communityList={communityList} color="white" />
            </div>
            <div className={style.leftContent__bottomContent}>
                <RandomQuoteContent randomQuote={randomQuote} conditionNav={statusClose} />
                <svg className={style.leftContent__bottomContent__navigationIcon} onClick={handleStatusClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Menu--Streamline-Ionic-Filled" height="48" width="48">
                    <desc>
                        Menu Streamline Icon: https://streamlinehq.com
                    </desc>
                    <path stroke="#c9c9c9" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4.5" d="M3.42 11.2595h41.16"></path>
                    <path stroke="#c9c9c9" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4.5" d="M3.42 24.0003h41.16"></path>
                    <path stroke="#c9c9c9" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4.5" d="M3.42 36.7405h41.16"></path>
                </svg>
            </div>
        </div>
    )
}