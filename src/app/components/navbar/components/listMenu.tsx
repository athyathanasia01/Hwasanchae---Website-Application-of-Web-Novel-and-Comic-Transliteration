// technical
import Link from "next/link";

// template
import { MenuNavBar } from "@hwasanchae/app/template/menu"; // ✅

// style
import style from "../../styles/navbar/componentStyle/ListMenu.module.scss";

type Props = {
    menus: MenuNavBar[];
    pathname: string;
}

export default function ListMenu({ menus, pathname }: Props) {
    return (
        <ul className={style.unorderListLink}>
            {menus.filter((menu) => menu.navigation).map((menu, index) => (
                <Link href={menu.href} key={index}>
                    <li 
                        className={`${style.unorderListLink__link} ${pathname === menu.href ? style[`unorderListLink__link--active`] : style[`unorderListLink__link--inactive`]}`}
                    >
                        {menu.name}
                    </li>
                </Link>
            ))}
        </ul>
    )
}