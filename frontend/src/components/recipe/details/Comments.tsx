import classes from "./Comments.module.css";
import { Comment } from "../../../utils/types";
import { displayDate } from "../../../utils/displayDate";

type CommentsProps = {
  comments: Comment[];
};

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className={classes.comments}>
      {comments.length > 0 && <p>Komentarze:</p>}
      {comments.map((commentSingle: Comment) => (
        <div key={commentSingle._id} className={classes.commentSingle}>
          <p>
            {commentSingle.author.username}
            <span className={classes.commentDate}>
              , {displayDate(new Date(commentSingle.commentDate))}
            </span>
          </p>
          <p>{commentSingle.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
