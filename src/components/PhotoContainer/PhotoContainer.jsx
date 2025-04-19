import "./PhotoContainer.css";

// config
import { uploads } from "../../utils/config";

// components
import { Link } from "react-router-dom";

const PhotoContainer = ({ photo }) => {
  return (
    <div className="showProjects">
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.userName} />
      )}
      <p id="title">{photo.title}</p>
      <p id="description">{photo.description}</p>
      <p id="userProject">
        Projeto de: <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
      </p>
    </div>
  );
};

export default PhotoContainer;
