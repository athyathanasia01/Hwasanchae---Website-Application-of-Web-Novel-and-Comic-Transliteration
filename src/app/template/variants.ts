// ✅ admin/dashboard/modalComponentStyle/button.tsx
// ✅ admin/mycontents/story/components/contentTop/left/components/buttonContainer.tsx 
// ✅ admin/mycontents/story/[idStory]/[idChapter]/components/topContent/components/buttonSubmit.tsx
export type Color = "black" | "pink";

// ✅ components/components/fourthContent/rightContent/content.tsx
// ✅ admin/mycontents/story/components/content.tsx
// ✅ template/story/status
// ✅ admin/mycontents/story/components/contentTop/content.tsx
// ✅ admin/mycontents/story/components/contentTop/right/content.tsx
// ✅ admin/mycontents/story/components/contentTop/right/components/inputContainer.tsx
export type StoryStatus = "On Going" | "Hiatus" | "Completed" | "Canceled / Discontinue" | "Drafted";

// ✅ admin/dashboard/modalComponentStyle/input.tsx
export type SourceInput = "fyi" | "quote" | "donate";

// ✅ admin/mycontents/story/components/contentTop/right/components/inputContent.tsx
export type WidthInput = "wide" | "medium" | "small";

// ✅ admin/dashboard/modalComponentStyle/textarea.tsx
export type SourceTextArea = "aboutme" | "quote";

// ✅ components/components/fourthContent/content.tsx
// ✅ components/components/fourthContent/leftContent/content.tsx
// ✅ components/components/fourthContent/leftContent/components/randomQuoteContent.tsx
// ✅ components/components/fourthContent/rightContent/content.tsx
export type ConditionNavigation = "open" | "close";

// ✅ components/components/fourthContent/rightContent/components/headerNav.tsx
export const storyStatus = [
    "On Going",
    "Hiatus",
    "Completed"
];

// ✅ components/components/fourthContent/rightContent/content.tsx
export type StoryOrder = "Last update" | "Descending" | "Ascending";

// ✅ components/components/fourthContent/rightContent/components/headerNav.tsx
export const storyOrder = [
    {
        order: "Last Update",
        name: "Last Update"
    }, 
    {
        order: "Descending",
        name: "A-Z"
    },
    {
        order: "Ascending",
        name: "Z-A"
    }
]

// ✅ auth/components/rightContent/inputContainer.tsx
export type InputPageName = "login" | "register";

// ✅ [story]/[idStory]/components/secondContent/content.tsx
export type MoreLess = "See More" | "See Less";

// ✅ components/tiptap-templates/simple/simple-editor.tsx
export const FONT_OPTIONS = [
    { label: "Inter", value: "inter" },
    { label: "Lora", value: "lora" },
    { label: "Merriweather", value: "merriweather" },
    { label: "Source Sans Pro", value: "source-sans" },
    { label: "Nunito", value: "nunito" },
    { label: "Roboto", value: "roboto" },
    { label: "Poppins", value: "poppins" }
]

// ✅
export const THEME_OPTIONS = [
    { 
        label: "General Dark", 
        value: {
            fontColor: "#FFFFFF",
            backColor: "#1d1c21"
        }
    },
    { 
        label: "Gummy Dark", 
        value: {
            fontColor: "#b3ceec",
            backColor: "#1d1c21"
        }
    },
    { 
        label: "General Light", 
        value: {
            fontColor: "#1D1C21",
            backColor: "#FFFFFF"
        }
    },
    { 
        label: "Gummy Light", 
        value: {
            fontColor: "#204570",
            backColor: "#f1dde6"
        }
    },
]