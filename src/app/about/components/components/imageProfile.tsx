// technical
import Image from 'next/image';

// template
import { Preview } from '@hwasanchae/app/template/hwasanchae/profile'; // ✅ 

// style
import style from '../styles/componentStyle/ImageProfile.module.scss';

type Props = {
    profile: Preview | null;
}

export default function ImageProfile({ profile }: Props) {
    return (
        <div className={style.imageProfileWrapper}>
            <Image 
                className={style.imageProfileWrapper__imageProfile}
                src={profile ? profile.url : "/image/profile_avatar.jpg"} 
                alt="Photo Profile" 
                fill
            />
        </div>
    )
}