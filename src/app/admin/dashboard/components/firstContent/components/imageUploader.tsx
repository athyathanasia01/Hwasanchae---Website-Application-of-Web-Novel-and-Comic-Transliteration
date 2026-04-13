// technical
import Image from 'next/image';
import { ChangeEvent, RefObject } from 'react';

// style
import style from "../../styles/firstContent/componentStyle/ImageUploader.module.scss";

type Props = {
    inputRef: RefObject<HTMLInputElement | null>;
    preview: string | null;
    handleClickPreview: () => void;
    handleChangePreview: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploader({ inputRef, preview, handleClickPreview, handleChangePreview }: Props) {
    return (
        <div className={style.avatarWrapper}>
            <Image 
                src={preview ? preview : `/image/profile_avatar.jpg`}
                alt="Profile"
                fill
                sizes='240px'
                className={style.avatarWrapper__avatar}
            />
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
        </div>
    )
}