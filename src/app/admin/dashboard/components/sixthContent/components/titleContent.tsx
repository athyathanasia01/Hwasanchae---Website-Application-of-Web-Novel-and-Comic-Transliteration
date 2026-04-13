// technical
import Image from 'next/image';

// style
import style from "../../styles/sixthContent/componentStyle/TitleContent.module.scss";

type Props = {
    title: string;
    image?: string | null;
}

export default function TitleContent({ title, image }: Props) {
    return (
        <div className={style.containerTitle}>
            <Image 
                src={image ? image : '/image/money_logo.png'}
                alt={`${title}'s logo`}
                width={32}
                height={32}
                className={style.containerTitle__logo}
            />
            <span className={style.containerTitle__title}>{title}</span>
        </div>
    )
}