import "./UpdateProjects.css";

// components
import Message from "../../components/Message/Message";

// hooks
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// icon
import { BiArrowBack } from "react-icons/bi";

// redux
import {
  updatePhoto,
  getPhotoById,
  resetMessage,
} from "../../slices/photoSlice";
import { uploads } from "../../utils/config";

const UpdateProjects = () => {
  const { id } = useParams();

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  const dispatch = useDispatch();

  const { photo, loading, message, error } = useSelector(
    (state) => state.photo
  );

  // reset message
  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // get the photo
  useEffect(() => {
    dispatch(getPhotoById(id));
  }, [dispatch, id]);

  // update a project
  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title: updateTitle,
      description: updateDescription,
      id: id,
    };

    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div id="updateProjects">
      <div className="container">
        <h1>Atualize seu projeto</h1>
        {photo && photo.image && (
          <img src={photo.image} alt={photo.userName} />
        )}
        <form onSubmit={handleSubmit} id="updateProjects">
          <label>
            <span>Título</span>
            <input
              type="text"
              onChange={(e) => setUpdateTitle(e.target.value)}
              value={updateTitle}
              placeholder="Novo título"
            />
          </label>
          <label>
            <span>Descrição</span>
            <input
              type="text"
              onChange={(e) => setUpdateDescription(e.target.value)}
              value={updateDescription}
              placeholder="Nova descrição"
            />
          </label>
          <input type="submit" value={"Atualizar"} className="btn-login" />
        </form>
        {message && <Message msg={message} type={"success"} />}
        {error && <Message msg={error} type={"err"} />}
        <Link to={"/profile"}>
          <BiArrowBack />
        </Link>
      </div>
    </div>
  );
};

export default UpdateProjects;
