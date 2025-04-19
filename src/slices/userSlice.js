import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  user: {},
  error: false,
  loading: false,
  success: false,
  message: null,
};

// get current user
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// update user
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// get user by id
export const getUserById = createAsyncThunk(
  "user/userId",
  async (id, thunkAPI) => {
    const data = await userService.getUserById(id);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.user = {};
      })
      .addCase(getUserById.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
