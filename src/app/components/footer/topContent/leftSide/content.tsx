// technical
import Image from 'next/image';

// template
import { SocialMedia } from '@hwasanchae/app/template/hwasanchae/socialmedia'; // ✅ 
import { Donation } from '@hwasanchae/app/template/hwasanchae/donation'; // ✅ 
import { External } from '@hwasanchae/app/template/other/external'; // ✅ 

// components
import ListNavigation from './components/listNavigation';

// style
import style from "../../../styles/footer/topContent/leftSide/Content.module.scss";

type Props = {
    donateList: Donation[];
    communityList: SocialMedia[];
    externalList: External[];
}

export default function LeftSide({ donateList, communityList, externalList }: Props) {
    return (
        <div className={style.leftSide}>
            <div className={style.leftSide__logoImage}>
                <Image 
                    className={style.leftSide__logoImage__logo}
                    src="/image/hwasanchae_logo.png" 
                    alt="Logo Hwasanchae" 
                    fill 
                />
            </div>
            {donateList.filter(donate => donate.link).length !== 0 && <ListNavigation name={'Support'} donateList={donateList} />}
            {communityList.filter(community => community.link).length !== 0 && <ListNavigation name={'Join Community'} communityList={communityList} />}
            <ListNavigation name={'External'} listData={externalList} />
        </div>
    )
}