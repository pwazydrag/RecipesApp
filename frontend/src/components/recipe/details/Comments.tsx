import { Comment } from "../../../utils/types";
import { displayDate } from "../../../utils/displayDate";
import NewComment from "./NewComment";

type CommentsProps = {
  comments: Comment[];
};

const Comments = ({ comments }: CommentsProps) => {
  const hasComments = comments.length > 0 ? true : false;

  return (
    <div className="text-left">
      <div>
        {hasComments && <h3>Komentarze:</h3>}
        {comments.map((commentSingle: Comment) => (
          <div
            key={commentSingle._id}
            className="bg-white rounded-2xl border border-solid border-red-300 shadow-md px-5 mt-5"
          >
            <h4 className="mt-4">
              <span>{commentSingle.author.username}</span>
              <span className="font-semibold">
                , {displayDate(new Date(commentSingle.commentDate))}
              </span>
            </h4>
            <p>{commentSingle.comment}</p>
          </div>
        ))}
      </div>
      <NewComment hasComments={hasComments} />
    </div>
  );
};

export default Comments;
