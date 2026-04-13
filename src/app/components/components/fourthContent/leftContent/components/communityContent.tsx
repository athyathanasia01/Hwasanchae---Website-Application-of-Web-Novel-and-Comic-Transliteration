// technical
import Link from "next/link";
import Image from "next/image";

// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia" // ✅ 

// style
import style from "../../../styles/fourthContent/leftContent/componentStyle/CommunityContent.module.scss";

type Props = {
    communityList: SocialMedia[];
    color: string;
}

export default function CommunityContent({ communityList, color }: Props) {
    return (
        <div className={`${style.communityContent} ${style[`communityContent--${color}`]}`}>
            <span className={style.communityContent__title}>Join Community</span>
            <ul className={style.communityContent__listCommunity}>
                {communityList.map((community, index) => (
                    <li key={index}>
                        <Link href={community.link!}>
                            <Image 
                                src={community.logo ? community.logo.url : "/image/community_logo.png"}
                                alt={community.name}
                                width={40}
                                height={40}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}