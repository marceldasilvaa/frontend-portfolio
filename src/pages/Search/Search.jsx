import "./Search.css";

// redux
import { like, searchProjects, resetMessage } from "../../slices/photoSlice";

// components
import { Link } from "react-router-dom";
import Likes from "../../components/Likes/Likes";
import Message from "../../components/Message/Message";
import PhotoContainer from "../../components/PhotoContainer/PhotoContainer";

// hooks
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "../../Hooks/useSearch";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photos, loading, message, error } = useSelector(
    (state) => state.photo
  );

  // reset message
  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // load search
  useEffect(() => {
    dispatch(searchProjects(search));
  }, [dispatch, search]);

  // insert like in photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div id="search">
      <div className="container">
        <h1>Resultados para: {search}</h1>
        {photos &&
          photos.map((photo) => (
            <div key={photo._id}>
              <PhotoContainer photo={photo} />
              <div className="showProjects">
                <hr />
                <Likes photo={photo} user={user} handleLike={handleLike} />
                <hr />
                <p>
                  <Link to={`/photos/${photo._id}`}>Ver mais</Link>
                </p>
              </div>
            </div>
          ))}
        {message && <Message msg={message} type={"success"} />}
        {error && <Message msg={error} type={"err"} />}
        {photos && photos.length === 0 && (
          <div className="noProjects">
            <p>Ainda não há projetos correspondentes à sua busca...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
