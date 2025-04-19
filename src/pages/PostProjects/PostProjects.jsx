import "./PostProjects.css";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import Message from "../../components/Message/Message";

// redux
import { resetMessage, postPhoto } from "../../slices/photoSlice";

const PostProjects = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageProject, setimageProject] = useState("");

  const { loading, error, message } = useSelector((state) => state.photo);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageProject);

    dispatch(postPhoto(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setimageProject(image);
  };

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="postProjects">
      <div className="container">
        <h1>Postar projetos</h1>
        <form onSubmit={handleSubmit} id="formPostProjects">
          <label>
            <span>Imagem do projeto</span>
            <input type="file" onChange={handleFile} />
          </label>
          <label>
            <span>Nome do projeto</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          <label>
            <span>Descrição do projeto</span>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </label>
          {loading && (
            <input type="submit" value="Aguarde..." className="btn-login" />
          )}
          {!loading && (
            <input type="submit" value="Postar" className="btn-login" />
          )}
          {error && <Message msg={error} type={"err"} />}
          {message && <Message msg={message} type={"success"} />}
        </form>
      </div>
    </div>
  );
};

export default PostProjects;
