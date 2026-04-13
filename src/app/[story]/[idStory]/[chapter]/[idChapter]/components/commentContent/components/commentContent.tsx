// template
import { CommentData } from "@hwasanchae/app/template/story/comment"; // ✅ 

// components 
import CommentItem from "./commentItem";

// style
import style from "../../styles/commentContent/componentStyle/CommentContent.module.scss";

type Props = {
    comments: CommentData[];
    idComment: string;
    refreshComments: () => Promise<void>;
}

export default function CommentContent({ comments, idComment, refreshComments }: Props) {
    return (
        <div className={style.commentListContainer}>
            <ul className={style.commentListContainer__listComment}>
                {comments.map((comment) => (
                    <CommentItem refreshComments={refreshComments} idComment={idComment} comment={comment} key={comment.id}/>
                ))}
            </ul>
        </div>
    )
}