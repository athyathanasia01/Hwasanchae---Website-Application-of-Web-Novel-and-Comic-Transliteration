// technical
import Image from "next/image"
import Link from "next/link";

// template
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation" // ✅ 

// style
import style from "../../../styles/fourthContent/leftContent/componentStyle/SupportContent.module.scss"

type Props = {
    donationList: Donation[];
    color: string;
}

export default function SupportContent({ donationList, color }: Props) {
    return (
        <div className={`${style.supportContent} ${style[`supportContent--${color}`]}`}>
            <Image
                src="/image/support_logo.png"
                alt="Logo Support"
                width={35}
                height={35}
            />
            <div className={style.supportContent__textContainer}>
                <span className={style.supportContent__textContainer__title}>Support Translator</span>
                <span className={style.supportContent__textContainer__intermezzo}>Please support translator via this link below!</span>
            </div>
            <ul className={style.supportContent__listDonation}>
                {donationList.map((donate, index) => (
                    <li key={index}>
                        <Link href={donate.link}>
                            <Image 
                                src={donate.logo?.url ? donate.logo.url : "/image/money_logo.png"}
                                alt={donate.name}
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