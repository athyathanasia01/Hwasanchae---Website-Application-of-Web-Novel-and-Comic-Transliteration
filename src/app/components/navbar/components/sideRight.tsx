// technical
import Image from 'next/image';

// template
import { Preview } from '@hwasanchae/app/template/hwasanchae/profile'; // ✅ 

// style
import style from "../../styles/navbar/componentStyle/SideRight.module.scss";

type Props = {
    status: string;
    handleOnClick: () => void;
    profile?: Preview | null;
    username?: string | null;
    handleOnClickProfile?: () => void;
}

export default function SideRight({ status, handleOnClick, profile, username, handleOnClickProfile }: Props) {
    return (
        <>
            {status === 'unauthenticated' ? 
                <div className={style.rightNav}>
                    <button className={style.rightNav__buttonLog} onClick={handleOnClick}>Login</button>
                </div>
            :
                <div className={style.rightNav}>
                    <div className={style.rightNav__profileContainer} onClick={handleOnClickProfile}>
                        <div className={style.rightNav__profileContainer__profile}>
                            <Image 
                                className={style.rightNav__profileContainer__profile__photoProfile}
                                src={profile ? profile.url : '/image/profile_avatar.jpg'} 
                                alt="Profile Photo" 
                                fill 
                            />
                        </div> 
                        <span className={style.rightNav__profileContainer__usernameProfile}>{username}</span>
                    </div>
                    <button className={style.rightNav__buttonLog} onClick={handleOnClick}>Logout</button>
                </div>
            }
        </>
    )
}