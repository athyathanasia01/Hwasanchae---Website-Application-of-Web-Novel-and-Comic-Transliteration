// technical
import Link from "next/link";
import Image from "next/image";

// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// style
import style from "../../../styles/thirdContent/rightContent/componentStyle/FindTranslator.module.scss";

type Props = {
    translator: string;
    listMediaTranslator: SocialMedia[];
}

export default function FindTranslator(
    { 
        translator, 
        listMediaTranslator 
    }: Props
) {
    return (
        <div className={style.translatorContainer}>
            <span className={style.translatorContainer__title}>Find Translator</span>
            <div className={style.translatorContainer__translator}>
                <span className={style.translatorContainer__translator__name}>{translator}</span>
                <ul className={style.translatorContainer__translator__link}>
                    {listMediaTranslator.filter(translator => translator.link).map((media, index) => (
                        <li key={index}>
                            <Link href={media.link!}>
                                <Image 
                                    src={media.logo ? media.logo.url : "/image/community_logo.png"} 
                                    alt={media.name} 
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}