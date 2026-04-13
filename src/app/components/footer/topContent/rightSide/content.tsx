// technical
import Link from "next/link";
import Image from "next/image";

// template
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// style
import style from "../../../styles/footer/topContent/rightSide/Content.module.scss";

type Props = {
    devContacts: SocialMedia[];
}

export default function RightSide({ devContacts }: Props) {
    return (
        <div className={style.rightSide}>
            {devContacts.filter(contact => contact.link).length !== 0 && 
                <>
                    <span className={style.rightSide__title}>Developer Contact</span>
                    <ul className={style.rightSide__unorderList}>
                        {devContacts.filter(contact => contact.link).map((devContact, index) => (
                            <Link target="_blank" rel="noopener noreferrer" href={devContact.link!} key={index}>
                                <Image
                                    className={style.rightSide__unorderList__imageLogo}
                                    src={devContact.logo ? devContact.logo.url : "/image/community_logo.png"} 
                                    alt={devContact.name}   
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        ))}
                    </ul>
                </>
            }
            
        </div>
    )
}