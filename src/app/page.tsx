// technical
import { ReactNode } from "react";

// components
import Content from "./components/components/content";

// template
import { MyStory } from "./template/story/story"; // ✅ 
import { getAllDataInfo } from "./template/uiHelper"; // ✅
import { NewChapterItem } from "./template/story/chapter"; // ✅
import { HwasanchaeData } from "./template/hwasanchae/hwasanchae"; // ✅ 
import { SocialMedia } from "./template/hwasanchae/socialmedia"; // ✅
import { Donation } from "./template/hwasanchae/donation"; // ✅

// style 
import style from "./components/components/styles/Content.module.scss";

async function getFyiList() {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/hwasanchae/fyiList`, {
          next: { tags: [`hwasanchae`] }
        });
        const responseData = await response.json();
        const data = responseData.data as string[];

        return data;
    } catch (error) {
        console.log(`Error get fyi list data: ${error}`);

        return [];
    }
}

async function getStoryList() {
  try {
    const baseUrl = process.env.BASE_URL!;
    const response = await fetch(`${baseUrl}/api/story`, { 
      next: { tags: [`story`] } 
    });
    const responseData = await response.json();
    let storyList = responseData.data as MyStory[];
    storyList = storyList.filter(story => story.status !== 'Canceled / Discontinue' && story.status !== 'Drafted');

    if (storyList.length === 0) return [];

    const newStoryList = await Promise.all(
      storyList.map(async (story) => {
        const detailStory = await getAllDataInfo(story.id, baseUrl);
        const responseChapter = await fetch(`${baseUrl}/api/chapter?idStory=${story.id}`, { 
          next: { tags: [`story`, `story:${story.id}`, `chapter`] } 
        });
        const responseChapterData = await responseChapter.json();
        const chapterData = responseChapterData.data as NewChapterItem[];

        if (detailStory) {
          return {
            ...story,
            chapters: chapterData,
            ...detailStory
          }
        } else {
          return {
            ...story,
            chapters: [],
            lastUpdate: '',
            lastTitle: '',
            vote: 0,
            read: 0,
            comments: 0
          }
        }
      })
    );

    return newStoryList;
  } catch (error) {
    console.log(`Error get list story: ${error}`);

    return [];
  }
}

async function getHwasanchae() {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/hwasanchae`, {
            next: { tags: [`hwasanchae`] }
        });
        const responseData = await response.json();
        const data = responseData.data as HwasanchaeData;

        return data;
    } catch (error) {
        alert(`Error: ${error}`);
        console.log(`Error get hwasanchae data: ${error}`);

        return null;
    }
}

export default async function Home({ children }: { children: ReactNode | null | undefined }) {
  const fyiList = await getFyiList();
  const storyList = await getStoryList();
  const hwasanchaeData = await getHwasanchae();
  let donationList: Donation[] = [];
  let communityList: SocialMedia[] = [];
  let randomQuote = { person: "", quote: "" };

  if (hwasanchaeData) {
    donationList = hwasanchaeData.donationList.filter(donate => donate.link);
    communityList = hwasanchaeData.communityList.filter(community => community.link);
    randomQuote = [...hwasanchaeData.quoteList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 1)[0] ?? { person: "", quote: "" };
  }

  return (
      <div className={style.content}>
        {children ?
          children
        :
          <Content fyiList={fyiList} storyList={storyList} communityList={communityList} donationList={donationList} randomQuote={randomQuote} />
        }
      </div>
  );
}
