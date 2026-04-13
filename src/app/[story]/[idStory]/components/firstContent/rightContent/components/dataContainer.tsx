// helper
import { formatDateToString, formatNumber } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// style 
import style from "../../../styles/firstContent/rightContent/componentStyle/DataContainer.module.scss";

type Props = {
    title: string;
    data: string | number;
}

export default function DataContainer({ title, data }: Props) {
    function formatData(value: string | number) {
        if (typeof value === "number") {
            return formatNumber(value);
        }

        if (typeof value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
            return formatDateToString(value);
        }

        return value;
    }
    
    return (
        <div className={style.container}>
            <span className={style.container__title}>{title}</span>
            <span className={style.container__data}>{formatData(data)}</span>
        </div>
    )
}