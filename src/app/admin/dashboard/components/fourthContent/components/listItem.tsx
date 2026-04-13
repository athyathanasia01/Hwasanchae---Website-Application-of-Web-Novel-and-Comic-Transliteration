// technical
import Image from "next/image";

// template
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 

// style
import style from "../../styles/fourthContent/componentStyle/ListItem.module.scss";

type Props = {
    name: string;
    profile?: Preview | null;
}

export default function ListItem({ name, profile }: Props) {
    function getColorFromString(str: string) {
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        // generate HSL
        const hue = hash % 360;

        const saturation = 45;
        const lightness = 60;  

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    return (
        <div className={style.listItem}>
            <div className={style.listItem__profileContainer} style={{ backgroundColor: getColorFromString(name) }}>
                {profile ?
                        <Image 
                            alt={`profile ${name}`}
                            src={profile.url}
                            width={40}
                            height={40}
                            className={style.listItem__profileContainer__profileImage}
                        />
                    :
                        <div className={style.listItem__profileContainer__profile}>{name?.charAt(0).toUpperCase()}</div>
                }
            </div>
            <span className={style.listItem__username}>{name}</span>
        </div>
    )
}