// technical
import Link from "next/link";
import Image from "next/image";

// template
import { listData, NameNavigation } from "@hwasanchae/app/template/other/navigationFooter"; // ✅ 
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// style
import style from "../../../../styles/footer/topContent/leftSide/componentStyle/ListNavigation.module.scss";

type Props = {
    name: NameNavigation;
    listData?: listData[];
    donateList?: Donation[];
    communityList?: SocialMedia[];
}

export default function ListNavigation({ name, listData, donateList, communityList }: Props) {
    return (
        <div className={style.navigation}>
            <span className={style.navigation__title}>{name}</span>
            <ul className={style.navigation__unorderList}>
                {name === 'Support' && donateList ?
                    donateList.filter((data) => data.link).map((data, index) => (
                        <Link 
                            href={data.link!} 
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                        >
                            <li className={style.navigation__unorderList__list}>
                                {
                                    <Image 
                                        className={style.navigation__unorderList__list__logoImage}
                                        src={data.logo?.url ? data.logo.url : "/image/money_logo.png"} 
                                        alt={data.name} 
                                        width={30}
                                        height={30}
                                    />
                                }
                                <span className={style.navigation__unorderList__list__listName}>{data.name}</span>
                            </li>
                        </Link>
                    ))
                    : 
                name === `Join Community`&& communityList ?
                    communityList.filter((data) => data.link).map((data, index) => (
                        <Link
                            href={data.link!}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                        >
                            <li className={style.navigation__unorderList__list}>
                                {
                                    <Image 
                                        className={style.navigation__unorderList__list__logoImage}
                                        src={data.logo?.url ? data.logo.url : "/image/community_logo.png"} 
                                        alt={data.name} 
                                        width={30}
                                        height={30}
                                    />
                                }
                                <span className={style.navigation__unorderList__list__listName}>{data.name}</span>
                            </li>
                        </Link>
                    ))
                    :
                listData ?
                    listData.filter((data) => data.link).map((data, index) => (
                        <Link 
                            href={data.link!} 
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                        >
                            <li className={style.navigation__unorderList__list}>
                                {name !== "External" &&
                                    <Image 
                                        className={style.navigation__unorderList__list__logoImage}
                                        src={data.logo ? data.logo : "/image/community_logo.png"} 
                                        alt={data.name} 
                                        width={30}
                                        height={30}
                                    />
                                }
                                <span className={style.navigation__unorderList__list__listName}>{data.name}</span>
                            </li>
                        </Link>
                    ))
                    :
                    null
                }
            </ul>
        </div>
    )
}