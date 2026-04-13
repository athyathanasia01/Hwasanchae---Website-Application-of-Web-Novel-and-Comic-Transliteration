// components
import ContainerDetail from "@hwasanchae/app/about/components/components/containerDetail";
import ImageProfile from "@hwasanchae/app/about/components/components/imageProfile";

// template
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 

// style
import style from "../../about/components/styles/Content.module.scss";

type Props = {
    name: string, 
    profile: Preview | null, 
    aboutme: string | null, 
    socialMedia: SocialMedia[], 
    color: string
}

export default function Content({ name, profile, aboutme, socialMedia, color }: Props) {
    return (
        <div className={style.content}>
            <span className={style.content__title}>About {name}</span>
            <div className={style.content__listContent}>
                {profile ?
                    <ImageProfile profile={profile} />
                : 
                    <div className={style.content__listContent__unProfile} style={{ backgroundColor: color }}>
                        <div className={style.content__listContent__unProfile__photo}>{name.charAt(0).toUpperCase()}</div>
                    </div>
                }
                <ContainerDetail aboutme={aboutme} communities={socialMedia} donates={[]} from="profile"/>
            </div>
        </div>
    )
}