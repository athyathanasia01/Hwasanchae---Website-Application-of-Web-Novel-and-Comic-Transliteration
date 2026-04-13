"use client";

// technical
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

// components
import PublicNavbar from "./components/navbar/content";
import PublicFooter from "./components/footer/content";

// template
import { menusPublic } from "./template/menu"; // ✅
import { Preview } from "./template/hwasanchae/profile"; // ✅
import { UserData } from "./template/other/username"; // ✅
import { External } from "./template/other/external"; // ✅
import { HwasanchaeData } from "./template/hwasanchae/hwasanchae"; // ✅
import { Developer } from "./template/other/developer"; // ✅

// style
import "./globals.css";
import style from "./styles/PublicLayout.module.scss";
import Link from "next/link";

async function getProfileDataUser() {
    try {
        const response = await fetch(`/api/auth/user`, {
            next: { tags: [`profile`] }
        });
        const responseData = await response.json();
        const data = responseData.data as UserData;

        return data;
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get profile data: ${error}`);

        return null;
    }
}

type Props = {
    children: ReactNode;
    data: {
        hwasanchae: HwasanchaeData,
        developer: Developer,
        external: External[]
    }
}

export default function PublicLayoutClient({
    children,
    data
}: Props) {
    const pathname = usePathname();
    const forbiddenPage = ["/admin", "/auth", "/dev"];
    const { data: session, status }: { data: any, status: string } = useSession();
    const { push } = useRouter();

    const [profilePhoto, setProfilePhoto] = useState<Preview | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isSmallDevice, setIsSmallDevice] = useState<boolean>(false);

    useEffect(() => {
        async function loadData() {
            if (status === 'authenticated') {
                const profileData = await getProfileDataUser();

                if (profileData) {
                    setProfilePhoto(profileData.profile);
                    setUsername(profileData.username);
                }
            }
        }

        loadData();
    }, [status, session]);

    useEffect(() => {
        function handleResize() {
            setIsSmallDevice(window.innerWidth < 1280);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleOnClickLog() {
        if (session && status === 'authenticated') {
            signOut();
        } else {
            signIn();
        }
    }

    function handleOnClickProfile() {
        if (status !== 'authenticated') return;

        if (session.user.role === 'admin') {
            push(`/admin/dashboard`);
        } else if (session.user.role === 'reader') {
            push(`/profile`);
        } else if (session.user.role === 'developer') {
            push(`/dev/dashboard`);
        } else return;
    }
    
    const isForbiddenPage = forbiddenPage.some(route =>
        pathname.startsWith(route)
    );

    return (
        isSmallDevice ?
            <div className={style.unaccessible}>
                <span>For now, this website is only accessible on PCs, laptops, or other devices with a minimum screen size of 1280 pixels width</span>
                <span>Please access <Link href={`https://mounthua-shinrei.blogspot.com/`}>this website</Link>, if you still want to going with your current device</span>
            </div>
        :
        (
            isForbiddenPage ? 
                // halaman admin & authentication & developer
                children
            : 
                // halaman user
                <div className={style.publicLayout}>
                    <PublicNavbar
                        menuPublic={menusPublic}
                        pathname={pathname}
                        status={status}
                        handleOnClickLog={handleOnClickLog}
                        profilePhoto={profilePhoto}
                        username={username}
                        handleOnClickProfile={handleOnClickProfile}
                    />
                    <main className={style.publicLayout__contentContainer}>
                        <div className={style.publicLayout__contentContainer__content}>
                            { children }
                        </div>
                        <PublicFooter 
                            communityList={data.hwasanchae.communityList} 
                            developerMedia={data.developer.contact} 
                            donationList={data.hwasanchae.donationList} 
                            externalList={data.external} 
                            webCopyright={data.hwasanchae.copyrightName}
                            devCopyright={data.developer.copyrightName}
                        />
                    </main>
                </div>
        )
    )
}