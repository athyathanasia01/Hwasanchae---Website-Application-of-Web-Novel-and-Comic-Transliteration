// technical
import React, { RefObject } from "react";

// style
import style from "../../../styles/contentTop/left/componentStyle/ImageUploader.module.scss";

type Props = {
    inputRef: RefObject<HTMLInputElement | null>;
    preview: string | null;
    handleChangePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickPreview: () => void;
}

export default function ImageUploader({ inputRef, preview, handleChangePreview, handleClickPreview }: Props) {
    return (
        <div>
            <div
                className={style.previewContainer}
                onClick={!preview ? handleClickPreview : undefined}
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="preview"
                            className={style.previewContainer__imageContainer}
                        />

                        <div
                            onClick={handleClickPreview}
                            className={style.previewContainer__buttonEdit}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "rgba(0,0,0,0.45)")
                            }
                        >
                            ✎
                        </div>
                    </>
                ) : (
                    <div
                        className={style.previewContainer__buttonAdd}
                    >
                        +
                    </div>
                )}
            </div>

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleChangePreview}
                hidden
            />
        </div>
    );
}
