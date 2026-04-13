// components
import TemplateContent from "./templateContent";
import FirstContent from "./firstContent/content";
import SecondContent from "./secondContent/content";
import ThirdContent from "./thirdContent/content";
import FourthContent from "./fourthContent/content";
import FifthContent from "./fifthContent/content";
import SixthContent from "./sixthContent/content";

// style
import style from "./styles/Content.module.scss";

export default function Content() {
    return (
        <div className={style.dashboardContent}>
            <FirstContent />
            <TemplateContent
                name="For Your Information"
                link="/admin/dashboard/fyi"
            >
                <SecondContent />
            </TemplateContent>
            <TemplateContent
                name="Your Quotes"
                link="/admin/dashboard/quotes"
            >
                <ThirdContent />
            </TemplateContent>
            <TemplateContent
                name="Incognito Profile"
                link="/admin/dashboard/incognito"
            >
                <FourthContent />
            </TemplateContent>
            <TemplateContent
                name="Community"
                link="/admin/dashboard/community"
            >
                <FifthContent />
            </TemplateContent>
            <TemplateContent
                name="Donate's Link"
                link="/admin/dashboard/donates"
            >
                <SixthContent />
            </TemplateContent>
        </div>
    )
}