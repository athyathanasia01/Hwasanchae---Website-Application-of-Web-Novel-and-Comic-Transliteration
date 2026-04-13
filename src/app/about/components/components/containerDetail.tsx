// technical
import Link from "next/link";
import Image from "next/image";

// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// style
import style from "../styles/componentStyle/ContainerDetail.module.scss";

type Props = {
    aboutme: string | null;
    donates: Donation[];
    communities: SocialMedia[];
    from: string;
}

export default function ContainerDetail({ aboutme, donates, communities, from }: Props) {
    return (
        <div className={style.containerDetail}>
            {!aboutme && donates.length === 0 && communities.length === 0 &&
                <div className={style.containerDetail__empty}>No data show!</div>
            }
            {aboutme && <p className={style.containerDetail__about}>{aboutme}</p>}
            <div className={style.containerDetail__containerModal}>
                {donates.length !== 0 ? 
                    <div className={style.containerDetail__containerModal__modal}>
                        <span className={style.containerDetail__containerModal__modal__name}>Support me!</span>
                        <ul className={style.containerDetail__containerModal__modal__list}>
                            {donates.map((donate, index) => (
                                <li key={index}>
                                    <Link href={donate.link}>
                                        <Image 
                                            src={donate.logo ? donate.logo.url : "/image/money_logo.png"} 
                                            alt={donate.name} 
                                            width={35}
                                            height={35}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                :
                    <></>
                }
                {communities.length !== 0 ? 
                    <div className={style.containerDetail__containerModal__modal}>
                        <span className={style.containerDetail__containerModal__modal__name}>{from === `about` ? `Follow Community!` : `Follow me!`}</span>
                        <ul className={style.containerDetail__containerModal__modal__list}>
                            {communities.filter((community) => community.link).map((community, index) => (
                                <li key={index}>
                                    <Link href={community.link!}>
                                        <Image 
                                            src={community.logo ? community.logo.url : "/image/community_logo.png"} 
                                            alt={community.name} 
                                            width={35}
                                            height={35}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                :
                    <></>
                }
            </div>
        </div>
    )
}