// technical
import Link from "next/link";
import Image from "next/image";

// template
import { MenuNavBar } from "@hwasanchae/app/template/menu"; // ✅ 

// components
import ListMenu from "./listMenu";

// style
import style from "../../styles/navbar/componentStyle/SideLeft.module.scss";

type Props = {
    menus: MenuNavBar[];
    pathname: string;
}

export default function SideLeft({ menus, pathname }: Props) {
    return (
        <div className={style.leftNav}>
            <Link href='/'>
                <div className={style.leftNav__logoWeb}>
                    <Image 
                        className={style.leftNav__logoWeb__logo}
                        src="https://res.cloudinary.com/da2wmwiql/image/upload/v1774505724/My%20Brand/hwasanchae_logo_dlx1fy.png" 
                        alt="Logo" 
                        fill
                    />
                </div>
            </Link>
            <ListMenu menus={menus} pathname={pathname} />
        </div>
    )
}