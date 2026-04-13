// style
import style from "../../styles/contentBottom/componentStyle/TextAreaContainer.module.scss";

type Props = {
    value: string | null | undefined;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    loadingState: boolean;
}

export default function InputTextArea({ value, setValue, loadingState }: Props) {
    return (
        <div className={style.textAreaContainer}>
            {loadingState ?
                    <>
                        <div className={style.textAreaContainer__titleLoad}></div>
                        <div className={style.textAreaContainer__textAreaLoad}></div>
                    </>
                :
                    <>
                        <span className={style.textAreaContainer__title}>Synopsis</span>
                        <textarea 
                            className={style.textAreaContainer__textArea}
                            placeholder="Write story synopsis here!" 
                            value={value ? value : ""} 
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </>
            }
        </div>
    )
}