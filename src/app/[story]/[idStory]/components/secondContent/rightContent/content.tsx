// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// components
import SupportContent from "@hwasanchae/app/components/components/fourthContent/leftContent/components/supportContent";
import ButtonAddBookmark from "./components/buttonAddBookmark";
import CommunityContent from "@hwasanchae/app/components/components/fourthContent/leftContent/components/communityContent";

// style
import style from "../../styles/secondContent/rightContent/Content.module.scss";

type Props = {
    handleOnClickBookmark: () => void;
    isBookmarked: Boolean;
    donations: Donation[];
    communities: SocialMedia[];
}

export default function RightContent(
    {
        handleOnClickBookmark,
        isBookmarked,
        donations,
        communities
    }: Props
) {
    return (
        <div className={style.rightContent}>
            <ButtonAddBookmark 
                handleOnClickBookmark={handleOnClickBookmark} 
                isBookmarked={isBookmarked} />
            <SupportContent donationList={donations} color="transparant" />
            <CommunityContent communityList={communities} color="transparant" />
        </div>
    )
}