import "./UserProject.css";

// hooks
import { useSelector, useDispatch } from "react-redux";

// redux
import { uploads } from "../../utils/config";
import { getUserById } from "../../slices/userSlice";

// links
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const PhotosUser = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // load user by id
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  return (
    <div id="userProject">
      <div className="container">
        <h1>Eu</h1>
        {user._id === id ? (
          <>
            {user.userProfile && (
              <img
                src={`${uploads}/${user.userProfile}`}
                alt={user.name}
                className="profileImage"
              />
            )}
            {user && (
              <>
                <p>
                  <strong>Nome</strong>: {user.name}
                </p>
                <p>
                  <strong>Bio</strong>: {user.bio}
                </p>
                <p>
                  Sim, sou o único que consegue publicar projetos no portfólio,
                  então só terá eu aqui. &#128514;
                </p>
              </>
            )}
          </>
        ) : (
          <p>O usuário nao é igual</p>
        )}
      </div>
    </div>
  );
};

export default PhotosUser;
