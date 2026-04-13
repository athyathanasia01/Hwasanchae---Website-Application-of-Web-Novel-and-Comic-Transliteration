"use client";

// technical
import { useState } from "react";
import { useRouter } from "next/navigation";

// components
import ImageWallpaper from "../components/leftContent/imageWallpaper";
import BottomNavigationWay from "../components/rightContent/bottomNavigationWay";
import InputContent from "../components/rightContent/inputContent";
import TitleText from "../components/rightContent/titleText";

// style
import style from "../styles/Content.module.scss";

export default function ContentRegister() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { push } = useRouter();

    function handleOnChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    function handleOnChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handleOnChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function handleOnPressButton(e: any) {
        e.preventDefault();

        try {
            const response = await fetch(`/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            const responseData = await response.json();

            if (responseData.status === 'Success') {
                push('/auth/login');
            } else {
                console.log('Error: ', responseData.message);
            }
        } catch (error) {
            alert(`Error: ${error}`);
            console.log(`Error register: ${error}`);
        }
    }

    return (
        <div className={style.content}>
            <ImageWallpaper />
            <form className={style.content__contentContainer} onSubmit={handleOnPressButton}>
                <TitleText textTitle="Register" />
                <InputContent 
                    pageName={"register"}
                    valueUsername={username}
                    handleOnChangeUsername={(e) => handleOnChangeUsername(e)}
                    valueEmail={email} 
                    handleOnChangeEmail={(e) => handleOnChangeEmail(e)} 
                    valuePassword={password} 
                    handleOnChangePassword={(e) => handleOnChangePassword(e)} 
                />
                <BottomNavigationWay 
                    context="register"
                    textButton={"Register"}
                    textSignRef="Already have account? Login"
                    linkRef="/auth/login" 
                />
            </form>
        </div>
    )
}