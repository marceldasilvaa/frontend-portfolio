import "./Likes.css";

// icons
import { BsHeart, BsHeartFill } from "react-icons/bs";

const Likes = ({ photo, user, handleLike }) => {
  return (
    <div id="likes">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} Like(s)</p>
        </>
      )}
    </div>
  );
};

export default Likes;
