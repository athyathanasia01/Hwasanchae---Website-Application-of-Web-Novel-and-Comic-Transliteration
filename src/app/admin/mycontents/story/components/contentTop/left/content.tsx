// technical
import { RefObject } from "react";

// components
import ButtonContainer from "./components/buttonContainer";
import ImageUploader from "./components/imageUploader";

// style
import style from "../../styles/contentTop/left/Content.module.scss";

type Props = {
    inputRef: RefObject<HTMLInputElement | null>;
    preview: string | null;
    handleChangePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickPreview: () => void;
    handleClickBack: () => void;
    loadingPreview: boolean;
}

export default function ContentTopLeft(
    { 
        inputRef, 
        preview, 
        handleChangePreview, 
        handleClickPreview, 
        handleClickBack,
        loadingPreview
    }: Props
) {
    return (
        <div className={style.contentTopLeft}>
            {loadingPreview ?
                    <>
                        <div className={style.contentTopLeft__previewLoad}></div>
                        <div className={style.contentTopLeft__buttonContainerLoad}></div>
                    </>
                :
                    <>
                        <ImageUploader 
                            inputRef={inputRef} 
                            preview={preview} 
                            handleChangePreview={handleChangePreview} 
                            handleClickPreview={handleClickPreview} 
                        />
                        <div className={style.contentTopLeft__buttonContainer}>
                            <ButtonContainer color="black" name="Back" type="button" onClick={handleClickBack} />
                            <ButtonContainer color="pink" name="Update" type="submit" />
                        </div>
                    </>
            }
        </div>
    )
}