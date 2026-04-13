// technical
import Link from "next/link";
import React, { useEffect, useState } from "react";

// style
import style from "../../styles/firstContent/componentStyle/AboutMe.module.scss";

type Props = {
    aboutme: string;
    copyrightName: string;
    isLoadingCopyright: boolean;
    handleOnChangeCopyright: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnClickCopyright: () => void;
}

export default function AboutMe({ aboutme, copyrightName, isLoadingCopyright, handleOnChangeCopyright, handleOnClickCopyright }: Props) {
    const [isLoadingCR, setIsLoadingCR] = useState<boolean>(false);

    useEffect(() => {
        setIsLoadingCR(isLoadingCopyright);
    }, [isLoadingCopyright]);

    return (
        <div className={style.aboutme}>
            {isLoadingCR ?
                    <div className={style.aboutme__name}>
                        <span className={style.aboutme__name__title}>Copyright Name</span>
                        <div className={style.aboutme__name__inputLoad}></div>
                    </div>
                : 
                    <div className={style.aboutme__name}>
                        <span className={style.aboutme__name__title}>Copyright Name</span>
                        <div className={style.aboutme__name__inputEdit}>
                            <input 
                                name="copyrightName"
                                className={style.aboutme__name__inputEdit__inputValue}
                                value={copyrightName}
                                onChange={(e) => handleOnChangeCopyright(e)}
                            />
                            <button className={style.aboutme__name__inputEdit__buttonEdit} onClick={handleOnClickCopyright}>Edit</button>
                        </div>
                    </div>
            }

            <div className={style.aboutme__about}>
                <div className={style.aboutme__about__topWrapper}>
                    <span className={style.aboutme__about__topWrapper__title}>About Me</span>
                    <span 
                        className={style.aboutme__about__topWrapper__linkEdit}
                    >
                        <Link href={`/admin/dashboard/aboutme`}>Edit</Link>
                    </span>
                </div>
                <textarea 
                    className={style.aboutme__about__inputValue}
                    value={aboutme}
                    disabled
                />
            </div>
            
        </div>
    )
}