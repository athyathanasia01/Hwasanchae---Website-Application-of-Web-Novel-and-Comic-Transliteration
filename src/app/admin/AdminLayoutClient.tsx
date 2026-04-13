"use client"

// technical
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

// font
import { Nunito } from 'next/font/google';
const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
})

// template
import { menusAdmin } from "../template/menu"; // ✅ 

// style
import style from "./styles/Admin.module.scss";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();
    const menus = menusAdmin.filter(menu => menu.navigation);
    const adminPage = menus.map((menu) => menu.href);
    
    const { data: session, status }: { data: any, status: string } = useSession();
    const { push } = useRouter();

    console.log(`session: `, session);
    console.log(`status: `, status);

    useEffect(() => {
        if (status === 'loading') return;

        if (status === 'unauthenticated' || session?.user?.role !== "admin") {
            push('/');
        } 
    }, [status, session]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated" || session?.user?.role !== "admin") {
        return null;
    }

    return (
        adminPage.includes(pathName) ?
            <>
                <nav className={`${style.navigationBar} ${nunito.className}`}>
                    <Image 
                        className="ml-2 mt-2"
                        src="https://res.cloudinary.com/da2wmwiql/image/upload/v1774505724/My%20Brand/hwasanchae_logo_dlx1fy.png"
                        height={80}
                        width={230}
                        alt="Logo"
                    />
                    <ul className={style.navigationBar__lists}>
                        {menus.map((menu, index) => (
                            <Link key={index} href={menu.href}>
                                <li 
                                    className={`${pathName === menu.href ? style.navigationBar__lists__containerActive : style.navigationBar__lists__container}`}
                                >
                                    {menu.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <Link href="/" target="_blank" rel="noopener noreferrer" className={style.navigationBar__website}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" id="Line-Arrow-Expand-Window-1--Streamline-Core-Remix" height="18" width="18">
                            <desc>
                                Line Arrow Expand Window 1 Streamline Icon: https://streamlinehq.com
                            </desc>
                            <g id="Free Remix/Interface Essential/line-arrow-expand-window-1--expand-small-bigger-retract-smaller-big">
                                <path id="Union" fill="#ffffff" fillRule="evenodd" d="M2.5714285714285716 2.0892857142857144c-0.2662842857142857 0 -0.4821428571428572 0.21585857142857146 -0.4821428571428572 0.4821428571428572v12.857142857142858c0 0.2662714285714286 0.21585857142857146 0.4821428571428572 0.4821428571428572 0.4821428571428572h12.857142857142858c0.2662714285714286 0 0.4821428571428572 -0.21587142857142858 0.4821428571428572 -0.4821428571428572V10.285714285714286c0 -0.44380285714285717 0.35974285714285714 -0.8035714285714286 0.8035714285714286 -0.8035714285714286s0.8035714285714286 0.3597685714285715 0.8035714285714286 0.8035714285714286v5.142857142857143c0 1.1539285714285714 -0.935357142857143 2.0892857142857144 -2.0892857142857144 2.0892857142857144H2.5714285714285716c-1.153877142857143 0 -2.0892857142857144 -0.935357142857143 -2.0892857142857144 -2.0892857142857144V2.5714285714285716C0.4821428571428572 1.4175514285714288 1.4175514285714288 0.4821428571428572 2.5714285714285716 0.4821428571428572h5.142857142857143c0.44380285714285717 0 0.8035714285714286 0.3597711428571429 0.8035714285714286 0.8035714285714286 0 0.44380285714285717 -0.3597685714285715 0.8035714285714286 -0.8035714285714286 0.8035714285714286H2.5714285714285716ZM10.767857142857144 1.2857142857142858c0 -0.4438002857142857 0.3597685714285715 -0.8035714285714286 0.8035714285714286 -0.8035714285714286h5.142857142857143c0.44382857142857146 0 0.8035714285714286 0.3597711428571429 0.8035714285714286 0.8035714285714286v5.142857142857143c0 0.44380285714285717 -0.35974285714285714 0.8035714285714286 -0.8035714285714286 0.8035714285714286s-0.8035714285714286 -0.3597685714285715 -0.8035714285714286 -0.8035714285714286V3.225702857142857L9.568208571428572 9.568208571428572c-0.31381714285714285 0.31381714285714285 -0.8226000000000001 0.31381714285714285 -1.136417142857143 0 -0.31381714285714285 -0.31381714285714285 -0.31381714285714285 -0.8226000000000001 0 -1.136417142857143L14.77427142857143 2.0892857142857144H11.571428571428573c-0.44380285714285717 0 -0.8035714285714286 -0.3597685714285715 -0.8035714285714286 -0.8035714285714286Z" clipRule="evenodd" strokeWidth="1.2857"></path>
                            </g>
                        </svg>
                        <span>Go to Website</span>
                    </Link>
                </nav>
                <div className={style.content}>{ children }</div>
            </>
        :
            <div className={`${style.containerNull} ${nunito.className}`}>
                { children }
            </div>
    )
}