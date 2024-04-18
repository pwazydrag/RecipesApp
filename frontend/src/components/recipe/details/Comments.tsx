import { Comment } from "../../../utils/types";
import { displayDate } from "../../../utils/displayDate";
import NewComment from "./NewComment";
import useFetchComments from "../../../hooks/useFetchComments";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

type CommentsProps = {
  recipeId: string;
};

const Comments = ({ recipeId }: CommentsProps) => {
  const { data, isError, isLoading, refetchData } = useFetchComments({
    id: recipeId,
  });

  const navigate = useNavigate();
  const navigateToAuthorProfile = (id: string) => {
    navigate(`/profile/${id}`);
  };

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Ładujemy komentarze...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Coś nie tak z komentarzami - przepraszamy!</p>
      </div>
    );

  const hasComments = data.length > 0 ? true : false;

  return (
    <div className="text-left">
      <div>
        {hasComments && <h3>Komentarze:</h3>}
        {data.map((commentSingle: Comment) => (
          <div
            key={commentSingle._id}
            className="bg-white rounded-2xl border border-solid border-red-300 shadow-md px-5 mt-5"
          >
            <h4 className="mt-4">
              <span
                className="hover:transition-all hover:ease-in-out hover:text-red-400 active:text-red-400 cursor-pointer"
                onClick={() =>
                  navigateToAuthorProfile(commentSingle.author._id)
                }
              >
                {commentSingle.author.username}
              </span>
              <span className="font-semibold">
                , {displayDate(new Date(commentSingle.commentDate))}
              </span>
            </h4>
            <p>{commentSingle.comment}</p>
          </div>
        ))}
      </div>
      <NewComment hasComments={hasComments} refetchData={refetchData} />
    </div>
  );
};

export default Comments;
