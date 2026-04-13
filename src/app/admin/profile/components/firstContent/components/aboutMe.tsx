// technical
import React from "react";

// style
import style from "../../styles/firstContent/componentStyle/AboutMe.module.scss";

type Props = {
    aboutme: string;
    username: string;
    handleOnChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnChangeAbout: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    loadingState: boolean;
}

export default function AboutMe(
    { 
        aboutme, 
        username, 
        handleOnChangeUsername, 
        handleOnChangeAbout,
        loadingState
    }: Props
) {
    return (
        <div className={style.aboutme}>
            {loadingState ?
                    <>
                        <div className={style.aboutme__name__inputLoad}></div>
                        <div className={style.aboutme__about__inputValueLoad}></div>
                    </>
                :
                    <>
                        <div className={style.aboutme__name}>
                            <span className={style.aboutme__name__title}>Username</span>
                            <div className={style.aboutme__name__inputEdit}>
                                <input 
                                    name="username"
                                    className={style.aboutme__name__inputEdit__inputValue}
                                    value={username}
                                    onChange={(e) => handleOnChangeUsername(e)}
                                />
                            </div>
                        </div>
                        <div className={style.aboutme__about}>
                            <span className={style.aboutme__about__title}>About Me</span>
                            <textarea 
                                className={style.aboutme__about__inputValue}
                                value={aboutme}
                                onChange={(e) => handleOnChangeAbout(e)}
                            />
                        </div>
                    </>
            }
        </div>
    )
}