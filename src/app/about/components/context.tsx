"use client";

// technical
import { useEffect, useState } from "react";

// template and data
import { Donation } from "@hwasanchae/app/template/hwasanchae/donation"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { HwasanchaeData } from "@hwasanchae/app/template/hwasanchae/hwasanchae"; // ✅ 
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 

// components
import ContainerDetail from "./components/containerDetail";
import ImageProfile from "./components/imageProfile";

// style
import style from "./styles/Content.module.scss";

type Props = {
    data: HwasanchaeData;
}

export default function Content({ data }: Props) {
    const [name, setName] = useState<string>("");
    const [profile, setProfile] = useState<Preview | null>(null);
    const [aboutMe, setAboutMe] = useState<string | null>(null);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [communities, setCommunities] = useState<SocialMedia[]>([]);

    useEffect(() => {
        const copyrightName = data.copyrightName;
        const donationList = data.donationList.filter(donate => donate.link);
        const about = data.about;
        const myProfile = data.profile;
        const communityList = data.communityList.filter(community => community.link);

        setName(copyrightName);
        setProfile(myProfile);
        setAboutMe(about);
        setDonations(donationList);
        setCommunities(communityList);
    }, [data]);

    return (
        <div className={style.content}>
            <span className={style.content__title}>About {name}</span>
            <div className={style.content__listContent}>
                <ImageProfile profile={profile} />
                <ContainerDetail aboutme={aboutMe} donates={donations} communities={communities} from="about" />
            </div>
        </div>
    )
}