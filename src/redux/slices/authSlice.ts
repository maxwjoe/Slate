import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../services/authServices";
import { generatePictureString } from "../../services/profilePictureService";
import { IAuth } from "../../interfaces/AuthInterface";

// Find User in Local Storage
//TODO: Define a user interface
const localUser = localStorage.getItem("user") as string;
const user: IAuth = JSON.parse(localUser) as IAuth;

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register the User
export const register = createAsyncThunk(
  "auth/register",
  async (user: IAuth, thunkAPI) => {
    try {
      return await authService.register({
        ...user,
        profileImage: generatePictureString(),
      });
    } catch (error: any) {
      const message =
        error?.response?.data || error?.messsage || error.toString();
      return thunkAPI.rejectWithValue(message as string);
    }
  }
);

// Login the User
export const login = createAsyncThunk(
  "auth/login",
  async (user: IAuth, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message =
        error?.response?.data || error?.messsage || error.toString();
      return thunkAPI.rejectWithValue(message as string);
    }
  }
);

// updateUser
export const RDX_updateUser = createAsyncThunk(
  "auth/update",
  async (userObj: IAuth, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.updateUser(userObj, token);
    } catch (error: any) {
      const message =
        error?.response?.data || error?.messsage || error.toString();
      return thunkAPI.rejectWithValue(message as string);
    }
  }
);

// Logout the user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(RDX_updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        RDX_updateUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(RDX_updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
