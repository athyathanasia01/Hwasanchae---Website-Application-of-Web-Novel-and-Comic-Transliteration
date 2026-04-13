// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// components
import CommunityContent from "@hwasanchae/app/components/components/fourthContent/leftContent/components/communityContent";
import SupportContent from "@hwasanchae/app/components/components/fourthContent/leftContent/components/supportContent";

// style 
import style from "../../../styles/bottomContent/rightContent/componentStyle/MiddleContainer.module.scss";

type Props = {
    donations: Donation[];
    communities: SocialMedia[];
}

export default function MiddleContainer({ donations, communities }: Props) {
    return (
        <div className={style.middleContainer}>
            <SupportContent donationList={donations} color="transparant" />
            <CommunityContent communityList={communities} color="transparant" />
        </div>
    )
}