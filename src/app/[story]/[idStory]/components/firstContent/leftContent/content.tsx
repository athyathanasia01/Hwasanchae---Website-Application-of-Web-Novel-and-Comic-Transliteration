// technical
import Image from "next/image"

// styles
import style from "../../styles/firstContent/leftContent/Content.module.scss";

type Props = {
    image: string;
    title: string;
}

export default function LeftContent({ image, title }: Props) {
    return (
        <div className={style.imageWrapper}>
            <Image
                className={style.imageWrapper__image}
                src={image} 
                alt={title}  
                fill
            />
        </div>
    )
}