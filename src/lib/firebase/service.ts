// app initiation
import app from "./init";

// firebase
import { collection, doc, getDoc, getDocs, getFirestore, limit, query, runTransaction, setDoc, updateDoc, where } from "firebase/firestore";
const firestore = getFirestore(app);

// cloudinary
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// encrypt
import bcrypt from "bcrypt";

// helper
import { formatDateTime, generateId } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// template
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 
import { DataStorySend, MyStory } from "@hwasanchae/app/template/story/story"; // ✅ 
import { MyChapter } from "@hwasanchae/app/template/story/chapter"; // ✅ 
import { CommentData } from "@hwasanchae/app/template/story/comment"; // ✅ 
import { IncognitoProfile, initUserMedia, UserData } from "@hwasanchae/app/template/other/username"; // ✅ 
import { DataChapter } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// LOGIN
export async function login(
    data: {
        email: string,
        password: string
    }
) {
    // check in users database is there any data with email as request body
    const quest = query(
        collection(firestore, "users"),
        where("email", "==", data.email),
        limit(1)
    );
    const snapshot = await getDocs(quest);

    // document the data snapshot if any
    const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    if (result.length > 0) {
        return({ status: `Success`, message: `Successfully login`, data: result[0] });
    } else {
        return({ status: `Failed`, message: `User Not Found` });
    }
}

// LOGIN WITH GOOGLE
export async function loginGoogle(
    data: any // data from google account
) {
    // check in users database is there any data with email as request body
    const quest = query(
        collection(firestore, "users"),
        where("email", "==", data.email),
        limit(1)
    );
    const snapshot = await getDocs(quest);

    // document the data snapshot if any
    const result: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    if (result.length > 0) {
        // if result any,
        try {
            const user = result[0] as UserData;
            const logType = user.logType.includes("google") ? user.logType : [...user.logType, "google"];
            
            let profile = user.profile;
            if (!profile) {
                const newProfile = await uploadToCloudinary(data.profile);
                profile = newProfile;
            }

            await updateDoc(doc(firestore, "users", user.id), { 
                logType,
                profile
            });

            return ({
                status: `Success`,
                message: `Successfully sign in with Google`,
                data: {
                    ...user,
                    logType
                }
            });
        } catch (error) {
            return ({
                status: `Failed`,
                message: `Failed to sign in with Google: ${error}`
            });
        }
    } else {
        // if no result in data list users
        try {
            let profileData = null;
            if (data.profile) {
                profileData = await uploadToCloudinary(data.profile);
            }

            const randomId = `user-${generateId(10)}`;

            const newUser = {
                email: data.email,
                username: data.username,
                role: "reader",
                logType: ["google"],
                profile: profileData,
                about: null,
                media: initUserMedia
            };

            await setDoc(doc(firestore, "users", randomId), {
                ...newUser,
                createdAt: formatDateTime()
            });

            return ({
                status: `Success`,
                message: `Successfully sign in with Google`,
                data: {
                    id: randomId,
                    ...newUser
                }
            })
        } catch (error) {
            return ({
                status: `Failed`,
                message: `Failed to sign in with Google: ${error}`
            });
        }
    }
}

// UPLOAD TO CLOUDINARY
export async function uploadToCloudinary(imageUrl: string) {
    const formData = new FormData();

    formData.append("file", imageUrl);
    formData.append("upload_preset", "profile_upload");
    formData.append("folder", "profile");

    const urlLink = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_IMAGE_LINK!;

    try {
        const result = await fetch(urlLink, {
            method: "POST",
            body: formData
        });

        const data = await result.json();

        return {
            url: data.secure_url,
            publicId: data.public_id
        };
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
}

// REGISTER
export async function register(
    data: {
        username: string,
        email: string,
        password: string
    }
) {
    const quest = query(
        collection(firestore, "users"),
        where("email", "==", data.email),
        limit(1)
    );
    const snapshot = await getDocs(quest);
    const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));

    if (result.length > 0) {
        return ({ status: `Failed`, message: `Email already exist` });
    } else {
        data.password = await bcrypt.hash(data.password, 10);
        const userData = {
            role: "reader",
            logType: ["credentials"],
            profile: null,
            media: initUserMedia,
            about: null,
            ...data
        }

        try {
            const idUserGenerated = `user-${generateId(10)}`;
            await setDoc(doc(firestore, "users", idUserGenerated), {
                ...userData,
                createdAt: formatDateTime()
            });
            return ({ status: `Success`, message: `Successfully register new user` });
        } catch (error) {
            return ({ status: `Failed`, message: `Failed register new user with error: ${error}` });
        }
    }
}

// GET USER DATA
export async function getUserData(
    userId: string
) {
    try {
        const reference = doc(firestore, "users", userId);
        const snapshot = await getDoc(reference);

        if (!snapshot.exists()) {
            return ({ 
                status: `Failed`, 
                message: `Failed to fetch data user. User not found!` 
            });
        }

        const data = {
            id: userId,
            ...snapshot.data()
        } as UserData;

        return ({ 
            status: `Success`, 
            message: `Successfully fetch user data`, 
            data: data 
        });
    } catch (error) {
        return ({ 
            status: `Failed`, 
            message: `Failed to fetch user data with error: ${error}` 
        });
    }
}

// UPDATE USER DATA
export async function updateUserData(
    userId: string,
    col: string,
    data: any,
    prevPubId?: string
) {
    try {
        await runTransaction(firestore, async (transaction) => {
            const reference = doc(firestore, "users", userId);
            const snapshot = await transaction.get(reference);

            if (!snapshot.exists()) {
                throw new Error(`Failed to update data user. User not found!`);
            }

            transaction.update(reference, {
                [col]: data
            });

            if (prevPubId) {
                await cloudinary.uploader.destroy(prevPubId);
            }
        });

        return ({
            status: `Success`,
            message: `Successfully update data user`
        });
    } catch (error) {
        return ({
            status: `Failed`,
            message: `Failed to update data user with error: ${error}`
        });
    }
}

// GET DATA PROFILE OF HWASANCHAE
export async function getHwasanchaeData(col: string | null) {
    try {
        const snapshot = await getDocs(collection(firestore, "hwasanchae"));
        const docSnap = snapshot.docs[0];
        if (!docSnap) return;

        const data = docSnap.data();

        if (col) {
            return ({ status: `Success`, message: `Successfully retrieved data`, data: data[col] });
        }

        return ({ status: `Success`, message: `Successfully retrieved data`, data: data });
    } catch (error) {
        return ({ status: `Failed`, message: `Failed retrieved data ${error}` });
    }
}

// UPDATE DATA PROFILE OF HWASANCHAE
export async function updateHwasanchaeData(
    col: string,
    value: any,
    prevPubId?: string
) {
    const COLLECTION = process.env.HWASANCHAE_NAME_DB!;
    const DOC_ID = process.env.HWASANCHAE_ID_DB!;
    const ref = doc(firestore, COLLECTION, DOC_ID);

    try {
        await updateDoc(ref, {
            [col]: value
        });

        if (prevPubId) {
            await cloudinary.uploader.destroy(prevPubId);
        }

        return ({ status: `Success`, message: `Successfully update hwasanchae data` });
    } catch (error) {
        return ({ status: `Failed`, message: `Failed update hwasanchae data with error: ${error}` });
    }
}

// ADD STORY
// At first time input, make chapters only size []
export async function addNewStory(
    data: DataStorySend
) {
    const idStoryGenerated = `story-${generateId(12)}`
    try {
        await setDoc(doc(firestore, "story", idStoryGenerated), {
            ...data,
            createdAt: formatDateTime()
        });

        return ({ status: `Success`, message: `Successfully add new story with id: ${idStoryGenerated} title: ${data.title} saved as ${data.status}` })
    } catch (error) {
        return ({ status: `Failed`, message: `Failed add new story with error: ${error}` });
    }
}

// GET STORY OR ALL STORY
export async function getStory(
    idStory?: string | null
) {
    try {
        if (idStory) {
            const snapshot = await getDoc(doc(firestore, "story", idStory));
            const storySnap = snapshot.data();

            if (!storySnap) return ({ status: `Failed`, message: `No data found` });

            const data = {
                id: idStory,
                ...storySnap
            };

            return ({ status: `Success`, message: `Successfullt fetch story with id: ${idStory}`, data: data });
        } else {
            const snapshot = await getDocs(collection(firestore, "story"));
            const storySnap = snapshot.docs;

            if (!storySnap) return;

            const data = storySnap.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            return ({ status: `Success`, message: `Successfully fetch all story`, data: data });
        }
    } catch (error) {
        return ({ status: `Failed`, message: `Failed fetch all story with error: ${error}` });
    }
}

// UPDATE STORY
export async function updateStory(
    idStory: string,
    data: DataStorySend,
    prevIllId?: string | null
) {
    try {
        if (!idStory || !data) return ({ status: `Failed`, message: `No ID story or data story included` });

        if (prevIllId) {
            await cloudinary.uploader.destroy(prevIllId);
        }

        const reference = doc(firestore, "story", idStory);
        await updateDoc(reference, {
            ...data,
            updatedAt: formatDateTime()
        });

        return ({ status: `Success`, message: `Successfully update data story with id: ${idStory}` });
    } catch (error) {
        return ({ status: `Failed`, message: `Failed to update story with error: ${error}` });
    }
}

// DELETE STORY
export async function deleteStory(
    idStory: string
) {
    try {
        await runTransaction(firestore, async (transaction) => {
            const storyRef = doc(firestore, "story", idStory);
            const storySnap = await transaction.get(storyRef);
            
            if (!storySnap.exists()) {
                throw new Error("Story not found");
            }
            
            const storyData = storySnap.data() as MyStory;
            
            for (const chapter of storyData.chapters) {
                const chapterRef = doc(firestore, "chapter", chapter.idChapter);
                const chapterSnap = await transaction.get(chapterRef);

                if (chapterSnap.exists()) {
                    const chapterData = chapterSnap.data() as MyChapter;

                    if (chapterData.commentId) {
                        const commentRef = doc(firestore, "comment", chapterData.commentId);
                        transaction.delete(commentRef);
                    }

                    transaction.delete(chapterRef);
                }
            }

            transaction.delete(storyRef);
        });

        return {
            status: `Success`,
            message: `Successfully deleted story ${idStory}`
        }
    } catch (error) {
        return {
            status: `Failed`,
            message: `Failed to delete story: ${error}`
        }
    }
}

// ADD CHAPTER 
// comment is set null
export async function addNewChapter(
    idStory: string,
    data: DataChapter
) {
    const idChapterGenerated = `chapter-${generateId(8)}`;
    const idComment = `comment-${generateId(5)}`;

    try {
        await runTransaction(firestore, async (transaction) => {
            const storyReference = doc(firestore, "story", idStory);
            const chapterReference = doc(firestore, "chapter", idChapterGenerated);
            const commentReference = doc(firestore, "comment", idComment);

            // get the storyData as document
            const storySnap = await transaction.get(storyReference);

            if (!storySnap.exists()) {
                throw new Error(`Can't find story with id: ${idStory}`);
            }

            // fetch storyData
            const storyData = storySnap.data() as DataStorySend;
            // fetch chapters
            const chapters = storyData.chapters || [];
            // add new sort chapter as last length
            const sortNewChapter = chapters.length + 1;

            transaction.set(commentReference, {
                comment: []
            });

            // add new chapter as id generated
            transaction.set(chapterReference, {
                ...data,
                commentId: idComment,
                createdAt: formatDateTime(),
                updatedAt: formatDateTime()
            });

            // update data in story with id Story, add new chapters in list as Chapter[]
            transaction.update(storyReference, {
                chapters: [...chapters, { idChapter: idChapterGenerated, sort: sortNewChapter }]
            })
        });

        return {
            status: `Success`,
            message: `Successfully add new chapter with id: ${idChapterGenerated} in idStory: ${idStory} saved as ${data.status}`
        }
    } catch (error) {
        return ({ status: `Failed`, message: `Failed add new chapter with error: ${error}` });
    }
}

// GET CHAPTER
export async function getChapter(
    idStory?: string | null,
    idChapter?: string | null
) {
    try {
        if (idStory && !idChapter) {
            const snapshot = await getDoc(doc(firestore, "story", idStory));
            const storySnap = snapshot.data() as DataStorySend;

            if (!storySnap) return ({ status: `Failed`, message: `No data found` });

            const chapters = storySnap.chapters;
            const chapterList: any = await Promise.all(
                chapters.map(async (chapter) => {
                    const thisChapter = await getChapter(null, chapter.idChapter);
                    const thisData = thisChapter?.data;
                    if (!thisData) return null;

                    return {
                        sort: chapter.sort,
                        ...thisData
                    }
                })
            );

            return ({
                status: `Success`,
                message: `Successfully fetch all chapter in story id: ${idStory}`,
                data: chapterList.filter(Boolean)
            })
        } else if (idChapter && !idStory) {
            const resultData = await runTransaction(firestore, async (transaction) => {
                const chapterQuest = doc(firestore, "chapter", idChapter);

                const chapterSnap = await transaction.get(chapterQuest);

                if (!chapterSnap) {
                    throw new Error(`Can't find chapter with id: ${idChapter}`);
                }

                // fetch chapter data
                const chapterData = chapterSnap.data() as MyChapter;
                const commentId = chapterData.commentId;

                let commentData: Comment[] = [];

                if (commentId) {
                    const commentQuest = doc(firestore, "comment", commentId);
                    const commentSnap = await transaction.get(commentQuest);

                    if (!commentSnap) {
                        commentData = [];
                    }

                    const data = commentSnap.data();
                    commentData = (data?.comment ?? []) as Comment[];
                }

                const data = {
                    id: idChapter,
                    title: chapterData.title,
                    content: chapterData.content,
                    footnotes: chapterData.footnotes,
                    vote: chapterData.vote,
                    read: chapterData.read,
                    status: chapterData.status,
                    commentId: chapterData.commentId,
                    comments: commentData,
                    updatedAt: chapterData.updatedAt,
                    createdAt: chapterData.createdAt
                };

                return data;
            })

            return {
                status: `Success`,
                message: `Successfully get chapter with id: ${idChapter}`,
                data: resultData
            }
        }
    } catch (error) {
        return ({ status: `Failed`, message: `Failed get chapter with error: ${error}` });
    }
}

// UPDATE CHAPTER
export async function updateChapter(
    idChapter: string,
    newData: DataChapter
) {
    try {
        const reference = doc(firestore, "chapter", idChapter);
        await updateDoc(reference, {
            ...newData,
            updatedAt: formatDateTime()
        })

        return ({ status: `Success`, message: `Successfully update chapter data id: ${idChapter}` })
    } catch (error) {
        return ({ status: `Failed`, message: `Failed update chapter with error: ${error}` });
    }
}

// DELETE CHAPTER
export async function deleteChapter(
    idChapter: string,
    idStory: string
) {
    try {
        await runTransaction(firestore, async (transaction) => {
            const storyRef = doc(firestore, "story", idStory);
            const chapterRef = doc(firestore, "chapter", idChapter);

            const storySnap = await transaction.get(storyRef);
            const storyData = storySnap.data() as DataStorySend;
            const newListChapter = storyData.chapters.filter(chapter => chapter.idChapter !== idChapter);

            const chapterSnap = await transaction.get(chapterRef);
            const chapterData = chapterSnap.data() as MyChapter;
            const commentId = chapterData.commentId;

            if (commentId) {
                const commentRef = doc(firestore, "comment", commentId);
                transaction.delete(commentRef);
                transaction.update(storyRef, { chapters: newListChapter });
                transaction.delete(chapterRef);
            }
        });

        return ({
            status: `Success`,
            message: `Successfully delete chapter id: ${idChapter}`
        });
    } catch (error) {
        return ({
            status: `Failed`,
            message: `Failed to delete chapter id: ${idChapter} with error: ${error}`
        });
    }
}

// ADD NEW READ OR LIKE
export async function renewDataReadLike(
    idChapter: string,
    data: string,
    upDown?: "up" | "down" | null,
    role?: string
) {
    if (role === 'admin' || role === 'writer') {
        return ({
            status: `Ignored`,
            message: `role ${role} ignored to update data read or like`
        });
    };
    if (!idChapter) {
        return ({
            status: `Failed`,
            message: `Failed to update data ${data} without idChapter`
        });
    };

    try {
        await runTransaction(firestore, async (transaction) => {
            const chapterQuest = doc(firestore, "chapter", idChapter);
            const chapterSnap = await transaction.get(chapterQuest);
            if (!chapterSnap) {
                throw new Error(`Can't find chapter with id: ${idChapter}`);
            }

            const chapterData = chapterSnap.data() as MyChapter;
            if (data === 'vote' && upDown) {
                let newVote: number;
                if (upDown === 'up') {
                    newVote = chapterData.vote + 1;
                } else {
                    newVote = chapterData.vote - 1;
                }

                transaction.update(chapterQuest, {
                    ...chapterData,
                    vote: newVote
                });
            } else if (data === 'read') {
                const newRead = chapterData.read + 1;

                transaction.update(chapterQuest, {
                    ...chapterData,
                    read: newRead
                });
            }
        });

        return {
            status: `Success`,
            message: `Successfully update data ${data} in id chapter: ${idChapter}`
        };
    } catch (error) {
        return ({
            status: `Failed`,
            message: `Failed to update data ${data} in id chapter: ${idChapter} with error: ${error}`
        });
    }
}

// ADD COMMENT
export async function addComment(
    comment: string,
    idComment?: string | null,
    idEdge?: string | null,
    username?: string | null,
    userId?: string | null,
    profile?: Preview | null,
) {
    if (!idComment) return ({
        status: `Failed`,
        message: `No ID comment refered`
    });

    if (!username) {
        const getRandomUsername = await getHwasanchaeData('incognito');
        const dataRandomUsername = getRandomUsername?.data as IncognitoProfile[];

        const dataUsernameRandom = dataRandomUsername[Math.floor(Math.random() * dataRandomUsername.length)];
        username = dataUsernameRandom.username;
        profile = dataUsernameRandom.profile;
    }

    if (!idEdge) {
        const randomId = `edge-${generateId(7)}`;

        try {
            await runTransaction(firestore, async (transaction) => {
                const commentQuest = doc(firestore, "comment", idComment);
                const commentSnap = await transaction.get(commentQuest);
                if (!commentSnap.exists) {
                    throw new Error(`No data comment found`);
                }

                const docData = commentSnap.data();
                if (!docData) {
                    throw new Error("Document data is undefined");
                }

                const commentData = (docData.comment || []) as CommentData[];
                console.log(commentData);
                const dataPush = {
                    id: randomId,
                    username: username,
                    userId: userId,
                    profile: profile,
                    comment: comment,
                    replies: []
                };
                commentData.push(dataPush);

                transaction.update(commentQuest, {
                    comment: commentData
                });
            });

            return {
                status: `Success`,
                message: `Successfully update comment data id comment: ${idComment}`
            };
        } catch (error) {
            return ({
                status: `Failed`,
                message: `Failed to update comment data in id comment: ${idComment} with error: ${error}`
            });
        }
    } else {
        const randomId = `leaf-${generateId(4)}`;

        try {
            await runTransaction(firestore, async (transaction) => {
                const commentQuest = doc(firestore, "comment", idComment);
                const commentSnap = await transaction.get(commentQuest);
                if (!commentSnap.exists) {
                    throw new Error(`No data comment found`);
                }

                const docData = commentSnap.data();
                if (!docData) {
                    throw new Error("Document data is undefined");
                }

                const commentData = (docData.comment || []) as CommentData[];
                const findCommentEdge = commentData.findIndex((comment) => comment.id === idEdge);
                if (findCommentEdge === -1) {
                    throw new Error(`Document id edge doesn't find in list`);
                }

                if (!commentData[findCommentEdge].replies) {
                    commentData[findCommentEdge].replies = [];
                }

                commentData[findCommentEdge].replies!.push({
                    id: randomId,
                    username,
                    userId,
                    profile,
                    comment,
                    replies: null
                });

                transaction.update(commentQuest, {
                    comment: commentData
                });
            });

            return {
                status: `Success`,
                message: `Successfully update comment data id comment: ${idComment}`
            };
        } catch (error) {
            return ({
                status: `Failed`,
                message: `Failed to update comment data in id comment: ${idComment} with error: ${error}`
            });
        }
    }
}

// GET COMMENT
export async function getCommentData(
    idComment: string
) {
    try {
        const reference = doc(firestore, "comment", idComment);
        const commentsFetch = await getDoc(reference);
        if(!commentsFetch.exists) {
            return ({
                status: `Failed`,
                message: `Failed to fetch data comment, No data found!`
            });
        }

        const commentData = commentsFetch.data();

        if (!commentData) {
            return ({
                status: `Failed`,
                message: `Failed to fetch data comment, No data found!`
            });
        }

        const commentListData = commentData.comment;

        return ({
            status: `Success`,
            message: `Successfully fetch comment data list`,
            data: commentListData
        })
    } catch (error) {
        console.log(`Error: ${error}`);
        return ({
            status: `Failed`,
            message: `Failed to fetch data comment, error: ${error}`
        });
    }
}

// UPDATE DEVELOPER CONTACT
export async function updateDeveloperContact(
    data: Record<string, any>
) {
    const COLLECTION = process.env.DEVELOPER_NAME_DB!;
    const DOC_ID = process.env.DEVELOPER_ID_DB!;
    const ref = doc(firestore, COLLECTION, DOC_ID);

    try {
        await updateDoc(ref, data);

        return ({ status: `Success`, message: `Successfully update developer contact data` });
    } catch (error) {
        return ({ status: `Failed`, message: `Failed update developer contact data with error: ${error}` });
    }
}

// GET DEVELOPER CONTACT
export async function getDeveloperContact() {
    try {
        const COLLECTION = process.env.DEVELOPER_NAME_DB!;
        const DOC_ID = process.env.DEVELOPER_ID_DB!;
        const ref = doc(firestore, COLLECTION, DOC_ID);

        const resultData = await getDoc(ref);
        const data = resultData.data();

        return ({ status: `Success`, message: `Successfully get contact developer data`, data: data });
    } catch (error) {
        return ({ status: `Failed`, message: `Failed get developer contact data with error: ${error}` });
    }
}

// NOTE:
// pisahkan antara beberapa collection dalam database :
// 1. story
// 2. chapter
// 3. comments