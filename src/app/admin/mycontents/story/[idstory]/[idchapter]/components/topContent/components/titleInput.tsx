// style
import style from "../../styles/topContent/componentStyle/TitleInput.module.scss";

type Props = {
    value: string | null;
    setValue: (e: any) => void;
}

export default function TitleInput({ value, setValue }: Props) {
    return (
        <input 
            type="text" 
            className={style.titleInput}
            onChange={setValue}
            value={value ? value : ""}
            placeholder="Title"
        />
    )
}