import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  success: false,
  error: false,
  loading: false,
  message: null,
};

// post a photo
export const postPhoto = createAsyncThunk(
  "photo/post",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.postPhoto(photo, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// get all photos
export const getAllPhotos = createAsyncThunk(
  "photos/getAll",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getAllPhotos(token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// like a photo
export const like = createAsyncThunk("photo/like", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = photoService.like(id, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

// get photo by id
export const getPhotoById = createAsyncThunk(
  "photo/getphoto",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotoById(photoData, token);

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// comment a photo
export const comment = createAsyncThunk(
  "photo/comment",
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.comment(
      { comment: commentData.comment },
      commentData.id,
      token
    );

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// get user photos
export const getPhotosUser = createAsyncThunk(
  "photo/photosUser",
  async (userId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotosUser(userId, token);

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// remove a photo
export const removePhoto = createAsyncThunk(
  "photo/remove",
  async (photoId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.removePhoto(photoId, token);

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// update a photo
export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.updatePhoto(
      { title: photoData.title, description: photoData.description },
      photoData.id,
      token
    );

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const searchProjects = createAsyncThunk(
  "photo/search",
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.searchProjects(query, token);

    // check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postPhoto.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(postPhoto.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Projeto publicado!";
      })
      .addCase(postPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getAllPhotos.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;

        if (state.photo && state.photo._id === action.payload.photoId) {
          state.photo.likes.push(action.payload.userId);
        }

        state.photos = state.photos.map((photo) => {
          if (photo._id === action.payload.photoId) {
            return {
              ...photo,
              likes: [...photo.likes, action.payload.userId],
            };
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;
        state.photo.comments.push(action.payload.comment);
        state.message = action.payload.message;
      })
      .addCase(comment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPhotoById.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(getPhotoById.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;
        state.photo = action.payload;
      })
      .addCase(getPhotosUser.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(getPhotosUser.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(removePhoto.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(removePhoto.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = false;
        state.loading = false;
        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });
      })
      .addCase(removePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updatePhoto.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = false;
        state.loading = false;
        state.photos = state.photos.map((photo) => {
          photo._id === action.payload.photo._id
            ? {
                ...photo,
                title: action.payload.photo.title,
                description: action.payload.photo.description,
              }
            : photo;
        });
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(searchProjects.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(searchProjects.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;
        state.photos = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
