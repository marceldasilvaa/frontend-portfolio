import "./Photo.css";

// components
import PhotoContainer from "../../components/PhotoContainer/PhotoContainer";
import Likes from "../../components/Likes/Likes";
import Message from "../../components/Message/Message";

// hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// redux
import {
  resetMessage,
  getPhotoById,
  like,
  comment,
} from "../../slices/photoSlice";
import { uploads } from "../../utils/config";

const Photo = () => {
  const [commentText, setCommentText] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();

  const { photo, loading, message, error } = useSelector(
    (state) => state.photo
  );
  const { user } = useSelector((state) => state.user);

  // reset message
  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // load photo
  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch]);

  // insert like in photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  // insert comment in photo
  const handleComment = (e) => {
    e.preventDefault();

    const comementData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(comementData));

    setCommentText("");

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <div className="container">
        <div className="showProjects">
          <PhotoContainer photo={photo} />
          <hr />
          <Likes photo={photo} user={user} handleLike={handleLike} />
          <hr />
          {photo.comments && (
            <div className="comments">
              <h3>Comentários: ({photo.comments.length})</h3>
              <form onSubmit={handleComment}>
                <input
                  type="text"
                  onChange={(e) => setCommentText(e.target.value)}
                  value={commentText || ""}
                  placeholder="Comente aqui"
                  className="commentInput"
                />
                <input type="submit" value={"Postar"} className="btn-login" />
              </form>
              {photo.comments.length === 0 && <p>Ainda não há comentários.</p>}
              {photo.comments.map((comment) => (
                <>
                  <div className="comment" key={comment.comment}>
                    <div className="userProfile">
                      {comment.userImage && (
                        <img
                          src={`${uploads}/users/${comment.userImage}`}
                          alt={comment.userName}
                          id="userImage"
                        />
                      )}
                    </div>
                    <p>{comment.userName}</p>
                  </div>
                  <p>{comment.comment}</p>
                  <hr />
                </>
              ))}
              {message && <Message msg={message} type={"success"} />}
              {error && <Message msg={error} type={"err"} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photo;
