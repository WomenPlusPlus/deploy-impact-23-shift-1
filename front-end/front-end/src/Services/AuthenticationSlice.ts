import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// TODO: are all these needed??
export enum AuthenticationStatus {
    NotAuthenticated = "init",
    Pending = "pending",
    InviteeAuthenticated = "invitee",
    Authenticated = "authenticated",
    AccessTokenInvalid = "accesstokenfail",
    LoginInvalid = "loginfail",
    LoggedOut = "loggedout",
    SignupFailed = "signupfail",
}

export enum LoginType {
    Non = "no user",
    NormalLogin = "normal",
    Invited = "invitee",
}

export enum Role {
  Non = "nondef",
  Admin = "admin",
  Association = "assosication",
  Candidate = "candidate",
  Company = "company",
}

export interface InitialState {
    status: AuthenticationStatus,
    loginType: LoginType,
    role: Role,
    token: string,
}

const initialState: InitialState = {
    status: AuthenticationStatus.NotAuthenticated,
    loginType: LoginType.Non,
    role: Role.Non,
    token: "",
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, secretid }:{email: string | undefined, secretid: string | null}) => {
    let result;
    if (email && secretid) {
      result = await axios.post(`${apiUrl}/login/`, {
          username: email,
          password: secretid,
      });
    }
    if (result?.status === 200) {
      return result.data;
    } else {
      // TODO: error handling
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, secretid, role }:{email: string | undefined, secretid: string | null, role: string | null}) => {
    let result;
    if (email && secretid) {
      const userData = {
        username: email,
        password: secretid,
        email: email,
        usertype: role
      }
      result = await axios.post(`${apiUrl}/signup/`, userData);
    }
    if (result?.status === 201) {
      return {
        role: role,
        token: result.data.token,
      };
    } else {
      console.log("error signingup", result?.status, result)
    }
  }
);

export const authenticationSlice = createSlice({
    name: "authenticationSlice",
    initialState: initialState,
    reducers: {
        logout(state) {
            state.status = AuthenticationStatus.LoggedOut;
            state.role = Role.Non;
            state.loginType = LoginType.Non;
        },
        inviteeLogin(state) {
            state.status = AuthenticationStatus.InviteeAuthenticated;
            state.loginType = LoginType.Invited;
        }, 
        inviteeLoginFail(state) {
            state.status = AuthenticationStatus.AccessTokenInvalid;
            state.loginType = LoginType.Invited;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.status = AuthenticationStatus.Pending;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.status = AuthenticationStatus.Authenticated;
            state.role = action.payload.user.usertype;
            state.loginType = LoginType.NormalLogin;

            state.token = action.payload.token;            
          })
          .addCase(login.rejected, (state, action) => {
            state.status = AuthenticationStatus.LoginInvalid;
            console.log("login failed", action.error);
            // TODO: error handling
          })
          .addCase(signup.fulfilled, (state, action) => {
            state.status = AuthenticationStatus.Authenticated;
            state.role = action.payload?.role ? action.payload?.role as Role : Role.Non;
            state.token = action.payload?.token;  
          })
          .addCase(signup.rejected, (state, action) => {
            state.status = AuthenticationStatus.SignupFailed;
            console.log("invitee signup failed", action.error);
              // TODO: error handling
          });
    },
});

export const { inviteeLogin, inviteeLoginFail, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;