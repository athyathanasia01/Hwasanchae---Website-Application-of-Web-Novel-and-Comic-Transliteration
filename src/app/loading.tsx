// technical
import Image from "next/image";

// style
import style from "./styles/Loading.module.scss";

export default function Loading() {
    return (
        <div className={style.floatLoading}>
            <Image
                src={"/image/load_state.png"}
                alt="Loading..."
                width={50}
                height={50}
            />
        </div>
    )
}