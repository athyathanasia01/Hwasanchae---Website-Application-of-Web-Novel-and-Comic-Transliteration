"use client";

// technical
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Image from "next/image";

// helper
import { slugify } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// template
import { LastReadData, LastReadStorage, NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 

// style
import style from "../styles/thirdContent/Content.module.scss";

type Props = {
    story: Omit<NewStoryDetail, 'isBookmark'>[];
}

export default function ThirdContent({ story }: Props) {
    const [lastChapter, setLastChapter] = useState<LastReadData[]>([]);
    const { push } = useRouter();

    useEffect(() => {
        const lastRead = localStorage.getItem("lastRead");
        const listLastRead: LastReadStorage[] = lastRead ? JSON.parse(lastRead) : [];

        let resultLastRead: LastReadData[] = [];

        listLastRead.forEach((last) => {
            const findStory = story.find(data => data.id === last.idStory);
            if (!findStory) return;

            const lastChapterId = last.chapter[last.chapter.length - 1];
            const findChapter = findStory.chapters.find(data => data.id === lastChapterId);

            if (!findChapter) return;

            resultLastRead.push({
                idStory: findStory.id,
                idChapter: findChapter.id,
                story: findStory.title,
                chapter: findChapter.title,
                image: findStory.coverImage?.url
            });
        });

        setLastChapter(resultLastRead);
    }, [story]);

    async function handleOnClickToDetail(idStory: string, story: string, idChapter: string, chapter: string) {
        push(`/${slugify(story)}/${idStory}/${slugify(chapter)}/${idChapter}`);
    }

    return (
        <div className={`${style.carouselContainer} ${lastChapter.length > 0 ? '' :  style[`carouselContainer--hidden`]}`}>
            <span className={style.carouselContainer__title}>Continue Reading</span>
            <Swiper
                modules={[EffectCoverflow]}
                effect="coverflow"
                centeredSlides
                slidesPerView="auto"
                grabCursor
                spaceBetween={40}
                loop
                loopAdditionalSlides={3}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false
                }}
                className={style.carouselContainer__swiper}
            >
                {lastChapter.map((last) => (
                    <SwiperSlide key={last.idChapter} className={style.carouselContainer__swiper__slider}>
                        <div
                            className={style.carouselContainer__swiper__slider__cardContainer}
                            onClick={() => handleOnClickToDetail(last.idStory, last.story, last.idChapter, last.chapter)}
                        >
                            <div className={style.carouselContainer__swiper__slider__cardContainer__coverWrapper}>
                                <Image 
                                    className={style.carouselContainer__swiper__slider__cardContainer__coverWrapper__cover}
                                    src={last.image ? last.image : "/image/image_cover.jpg"}
                                    alt={last.chapter}
                                    fill
                                />
                            </div>
                            <div className={style.carouselContainer__swiper__slider__cardContainer__detail}>
                                <span className={style.carouselContainer__swiper__slider__cardContainer__detail__title}>{last.story}</span>
                                <span className={style.carouselContainer__swiper__slider__cardContainer__detail__last}>{last.chapter}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}