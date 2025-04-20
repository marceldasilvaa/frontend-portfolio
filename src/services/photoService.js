import { api, requestConfig } from "../utils/config";

// post a photo
const postPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);
  try {
    const res = await fetch(api + "photos/post", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get all photos
const getAllPhotos = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "photos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// like a photo
const like = async (id, token) => {
  const config = requestConfig("PUT", null, token);

  try {
    const res = await fetch(api + "photos/like/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get photo by id
const getPhotoById = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + `photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// comment a photo
const comment = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "photos/comment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get user photos
const getPhotosUser = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + `photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// remove a photo
const removePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + `photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// update a photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + `photos/update/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// search for project
const searchProjects = async (query, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}photos/search?q=${query}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  postPhoto,
  getAllPhotos,
  like,
  getPhotoById,
  comment,
  getPhotosUser,
  removePhoto,
  updatePhoto,
  searchProjects,
};

export default photoService;
