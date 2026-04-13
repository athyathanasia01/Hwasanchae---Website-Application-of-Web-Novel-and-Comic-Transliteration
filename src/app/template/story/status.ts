import { StoryStatus } from "../variants"; // ✅ 

// ✅ admin/mycontents/story/components/content.tsx
export const statusDescription: Record<StoryStatus, string> = {
    "On Going": "You set this story as on going means the story has not finished yet",
    "Hiatus": "You set this story as hiatus means you or the author postpone to continue",
    "Completed": "You set this story as completed means the story has already finished, but you still can update it",
    "Canceled / Discontinue": "You set this story as C/D means the story is canceled/discontinue production",
    "Drafted": "You set this story as drafted means the story can’t be seen by readers",
};