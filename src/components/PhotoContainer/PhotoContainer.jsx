import "./PhotoContainer.css";

import { getImageUrl } from "../../utils/config";

// components
import { Link } from "react-router-dom";

const PhotoContainer = ({ photo }) => {
  return (
    <div className="showProjects">
      {photo.image && (
        <img src={getImageUrl(photo.image)} alt={photo.userName} />
      )}
      <p id="title">{photo.title}</p>
      <p id="description">{photo.description}</p>
      <p id="userProject">
        Projeto de: <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
      </p>
      <p id="link">
        Acesse o projeto aqui:{" "}
        <a href={photo.link} target="_blank" rel="noopener noreferrer">
          {photo.title}
        </a>
      </p>
    </div>
  );
};

export default PhotoContainer;
