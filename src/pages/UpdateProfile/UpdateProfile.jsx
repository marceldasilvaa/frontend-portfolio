import "./UpdateProfile.css";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// icon
import { BiArrowBack } from "react-icons/bi";

// links
import { Link } from "react-router-dom";

// image url
import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message/Message";

// redux
import { resetMessage, profile, updateProfile } from "../../slices/userSlice";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const { user, loading, error, message } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // make a form data
    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
      if (userData[key]) {
        formData.append(key, userData[key]);
      }
    });

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    await dispatch(updateProfile(formData));

    await dispatch(profile());

    // reset message update
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // update image state
    setProfileImage(image);
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

  return (
    <div id="updateProfile">
      <div className="container">
        <h1>Atualize seu perfil</h1>
        <form onSubmit={handleSubmit} id="updateForm">
          {(user.userProfile || previewImage) && (
            <img
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : `${uploads}/users/${user.userProfile}`
              }
              alt={user.name}
              className="profileImage"
            />
          )}
          <label>
            <span>Foto de perfil</span>
            <input type="file" onChange={handleFile} />
          </label>
          <label>
            <span id="nome">Nome</span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
            />
          </label>
          <label>
            <span id="email">Email</span>
            <input type="text" value={email || ""} disabled />
          </label>
          <label>
            <span>Bio</span>
            <input
              type="text"
              onChange={(e) => setBio(e.target.value)}
              value={bio || ""}
              placeholder="Bio"
            />
          </label>
          <label>
            <span>Nova Senha</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
              placeholder="Nova senha"
            />
          </label>
          {!loading && (
            <input type="submit" className="btn-login" value="Atualizar" />
          )}
          {loading && (
            <input
              type="submit"
              className="btn-login"
              value="Aguarde..."
              disabled
            />
          )}
          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
        </form>
        <Link to={"/profile"}>
          <BiArrowBack />
        </Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
