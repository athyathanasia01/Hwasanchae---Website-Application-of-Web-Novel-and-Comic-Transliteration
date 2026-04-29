"use client";

// technical
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

// components
import ImageWallpaper from "../components/leftContent/imageWallpaper";
import BottomNavigationWay from "../components/rightContent/bottomNavigationWay";
import InputContent from "../components/rightContent/inputContent";
import TitleText from "../components/rightContent/titleText";

// style
import style from "../styles/Content.module.scss";

export default function ContentLogin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const params = useSearchParams();
    const callbackUrl = params.get('callbackUrl') || '/auth/login';

    const { push } = useRouter();

    const { data: session, status }: { data: any, status: string } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role === 'admin') {
                push('/admin/dashboard');
            } else if (session?.user?.role === 'developer') {
                push('/dev/dashboard');
            } else {
                push('/');
            }
        }
    }, [session, status])

    function handleOnChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handleOnChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function handleOnPressButton(e: any) {
        e.preventDefault();
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
                // callbackUrl: callbackUrl
            });

            if (!response?.error) {
                push(callbackUrl);
            } else {
                alert(`Error: ${response.error}`);
                console.log(`Error while try to login: ${response.error}`);
            }
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error while try to login: ${error}`);
        }
    }

    async function handleOnPressGoogle() {
        try {
            await signIn("google", {
                callbackUrl: "/auth/login",
                redirect: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={style.content}>
            <ImageWallpaper />
            <form className={style.content__contentContainer} onSubmit={handleOnPressButton}>
                <TitleText textTitle="Login" />
                <InputContent 
                    pageName={"login"}
                    valueEmail={email} 
                    handleOnChangeEmail={(e) => handleOnChangeEmail(e)} 
                    valuePassword={password} 
                    handleOnChangePassword={(e) => handleOnChangePassword(e)} 
                />
                <BottomNavigationWay 
                    context="login"
                    textButton={"Login"}
                    handleOnPressGoogle={handleOnPressGoogle}
                    textSignRef="Don't have account yet? Register"
                    linkRef="/auth/register" 
                />
            </form>
        </div>
    )
}