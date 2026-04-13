// technical
import Image from 'next/image';
import { ChangeEvent, RefObject } from 'react';

// style
import style from "../../styles/firstContent/componentStyle/ImageUploader.module.scss";

type Props = {
    inputRef?: RefObject<HTMLInputElement | null>;
    preview: string | null;
    handleClickPreview?: () => void | null;
    handleChangePreview?: (e: ChangeEvent<HTMLInputElement>) => void | null;
    loadingStatePreview: boolean;
}

export default function ImageUploader(
    { 
        inputRef, 
        preview, 
        handleClickPreview, 
        handleChangePreview,
        loadingStatePreview
    }: Props
) {
    return loadingStatePreview ?
            <div className={style.avatarWrapperLoad}></div>
        :
            <div className={style.avatarWrapper}>
                <Image 
                    src={preview ? preview : `/image/profile_avatar.jpg`}
                    alt="Profile"
                    fill
                    sizes='240px'
                    className={style.avatarWrapper__avatar}
                />
                {handleClickPreview && handleChangePreview &&
                    <>
                        <button 
                            className={style.avatarWrapper__editButton}
                            onClick={handleClickPreview}
                        >
                            ✎
                        </button>

                        <input 
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleChangePreview}
                            hidden
                        />
                    </>
                }
            </div>
}