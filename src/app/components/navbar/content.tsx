// template
import { MenuNavBar, menusPublic } from "@hwasanchae/app/template/menu"; // ✅
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅

// components
import SideLeft from "./components/sideLeft";
import SideRight from "./components/sideRight";

// style
import style from "../styles/navbar/Content.module.scss";

type Props = {
    menuPublic: MenuNavBar[];
    pathname: string;
    status: string;
    handleOnClickLog: () => void;
    profilePhoto: Preview | null;
    username: string | null;
    handleOnClickProfile: () => void;
}

export default function PublicNavbar(
    { 
        menuPublic, 
        pathname, 
        status, 
        handleOnClickLog, 
        profilePhoto, 
        username, 
        handleOnClickProfile 
    }: Props
) {
    const publicPage = menuPublic.map((menu) => menu.href);

    return (
        publicPage.some((link) => pathname.startsWith(link)) ?
            <div className={style.navbar}>
                <SideLeft 
                    menus={menusPublic} 
                    pathname={pathname} 
                />
                <SideRight 
                    status={status} 
                    handleOnClick={handleOnClickLog} 
                    profile={profilePhoto} 
                    username={username} 
                    handleOnClickProfile={handleOnClickProfile}
                />
            </div>
        : 
            <>
            </>
    )
}