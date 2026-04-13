// technical
import Image from "next/image"

// style
import style from "../styles/leftContent/ImageWallpaper.module.scss";

export default function ImageWallpaper() {
    return (
        <div className={style.imageWallpaper}>
            <Image 
                src="/image/book_feather_page.jpg" 
                alt="Cover Book Feather"
                width={300}
                height={320}        
            />
        </div>
    )
}