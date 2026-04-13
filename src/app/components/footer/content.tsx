// components
import TopContent from "./topContent/content";
import BottomContent from "./bottomContent/content";

// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { External } from "@hwasanchae/app/template/other/external"; // ✅

// style
import style from "../styles/footer/Content.module.scss";

type Props = {
    donationList: Donation[];
    communityList: SocialMedia[];
    externalList: External[];
    developerMedia: SocialMedia[];
    webCopyright: string,
    devCopyright: string
}

export default function PublicFooter(
    {  
        donationList, 
        communityList, 
        externalList, 
        developerMedia,
        webCopyright,
        devCopyright
    }: Props
) {
    return (
        <div className={style.footerContainer}>
            <TopContent donationList={donationList} communityList={communityList} developerMedia={developerMedia} externalList={externalList} />
            <BottomContent webCopyright={webCopyright} devCopyright={devCopyright} />
        </div>
    )
}