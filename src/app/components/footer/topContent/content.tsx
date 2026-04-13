// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { External } from "@hwasanchae/app/template/other/external"; // ✅ 

// components
import LeftSide from "./leftSide/content";
import RightSide from "./rightSide/content";

// style
import style from "../../styles/footer/topContent/Content.module.scss";

type Props = {
    donationList: Donation[];
    communityList: SocialMedia[];
    externalList: External[];
    developerMedia: SocialMedia[];
}

export default function TopContent(
    { 
        donationList, 
        communityList, 
        externalList, 
        developerMedia 
    }: Props
) {
    return (
        <div className={style.topContent}>
            <LeftSide donateList={donationList} communityList={communityList} externalList={externalList} />
            <RightSide devContacts={developerMedia} />
        </div>
    )
}