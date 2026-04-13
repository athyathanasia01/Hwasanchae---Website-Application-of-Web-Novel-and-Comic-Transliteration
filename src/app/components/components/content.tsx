// components
import FirstContent from "./firstContent/content";
import FourthContent from "./fourthContent/content";
import SecondContent from "./secondContent/content";
import ThirdContent from "./thirdContent/content";

// template 
import { NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { QuoteItem } from "@hwasanchae/app/template/hwasanchae/quote"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// style
import style from './styles/Content.module.scss';

type Props = {
    fyiList: string[];
    storyList: Omit<NewStoryDetail, 'isBookmark'>[];
    donationList: Donation[];
    randomQuote: QuoteItem;
    communityList: SocialMedia[];
}

export default function Content({ fyiList, storyList, communityList, donationList, randomQuote }: Props) {
    return (
        <div className={style.content}>
            <FirstContent 
                fyi={fyiList} 
            />
            <SecondContent 
                story={storyList} 
            />
            <ThirdContent 
                story={storyList} 
            />
            <FourthContent 
                story={storyList} 
                communityList={communityList} 
                donationList={donationList} 
                randomQuote={randomQuote} 
            />
        </div>
    )
}