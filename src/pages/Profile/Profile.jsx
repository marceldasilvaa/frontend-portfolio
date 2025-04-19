import "./Profile.css";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import Message from "../../components/Message/Message"

// icons
import { TfiPencil } from "react-icons/tfi";
import { MdOutlineCancel } from "react-icons/md";

// link
import { Link } from "react-router-dom";

// redux
import { profile } from "../../slices/userSlice";
import {
  getPhotosUser,
  removePhoto,
  resetMessage,
} from "../../slices/photoSlice";
import { uploads } from "../../utils/config";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const { user: userAuth } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.user);
  const { photos, message } = useSelector((state) => state.photo);

  const dispatch = useDispatch();

  // reset component message
  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // put user data in input
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
    }
  }, [user]);

  // get user photos
  useEffect(() => {
    dispatch(getPhotosUser(userAuth._id));
  }, [dispatch]);

  // remove a photo
  const handleRemove = (photo) => {
    dispatch(removePhoto(photo));

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="container">
        <hr />
        <div id="dataUserForm">
          {user.userProfile && (
            <img
              src={`${uploads}/users/${user.userProfile}`}
              alt={user.name}
              className="profileImage"
            />
          )}
          <form>
            <label>
              <span>Nome</span>
              <input type="text" disabled value={name} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" disabled value={email} />
            </label>
            <label>
              <span>Bio</span>
              <input type="text" disabled value={bio} />
            </label>
          </form>
        </div>
        <hr />
        <p>
          Deseja atualizar suas informações?{" "}
          <Link to="/updateProfile">Clique aqui</Link>
        </p>
        {photos &&
          photos.map((photo) => (
            <div id="projectsUser" key={photo._id}>
              <img
                src={`${uploads}/photos/${photo.image}`}
                alt={photo.userName}
              />
              <h3>{photo.title}</h3>
              <p>{photo.description}</p>
              <hr />
              <div className="editProjects">
                <Link to={`/update/${photo._id}`}>
                  <TfiPencil />
                </Link>
                <MdOutlineCancel
                  id="cancel"
                  onClick={() => handleRemove(photo._id)}
                />
              </div>
              <hr />
              {message && <Message msg={message} type={"success"} />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
