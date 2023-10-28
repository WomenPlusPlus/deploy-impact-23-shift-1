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
  Non = "unknown",
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
    username: string,
}

const initialState: InitialState = {
    status: AuthenticationStatus.NotAuthenticated,
    loginType: LoginType.Non,
    role: Role.Non,
    token: "",
    username: "",
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
  async ({ username, secretid, role, email, name, phone }:{username: string | undefined, secretid: string | null, role: string | null, email: string | undefined, name: string | null, phone: string | null}) => {
    let result;
    if (email && secretid) {
      const userData = {
        username: username,
        password: secretid,
        email: email,
        user_type: role,
        name: name,
        phone_number: phone,
        // TODO: get from UI
        terms_and_conditions: true,
        privacy_policy: true,
      }
      result = await axios.post(`${apiUrl}/signup/`, userData);
    }
    if (result?.status === 201) {
      return {
        username: username,
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
            state.username = "";
            state.token = "";
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
            state.role = action.payload.user.user_type;
            state.loginType = LoginType.NormalLogin;
            state.username = action.payload.user.email;
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
            state.username = action.payload?.username ? action.payload?.username : "";
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