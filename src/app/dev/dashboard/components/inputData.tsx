// technical
import { ChangeEvent } from "react";

// style
import style from "./styles/InputData.module.scss";

type Props = {
    copyright: string;
    handleOnChangeCopyright: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputData({ copyright, handleOnChangeCopyright }: Props) {
    return (
        <div className={style.inputData}>
            <span className={style.inputData__title}>Copyright Name</span>
            <input className={style.inputData__input} type="text" value={copyright} onChange={handleOnChangeCopyright} />
        </div>
    )
}