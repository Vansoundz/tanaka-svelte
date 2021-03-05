import authApi from "../api/auth.api";
import type { User } from "../models/user.model";

const login = async (user: { email: string; password: string }) => {
  try {
    let data = (await authApi.login(user)).data;
    return data;
  } catch (error) {
    if (error?.response) {
      throw error.response.data.errors;
    }
    throw "error";
  }
};

const initAuth = async (): Promise<User> => {
  try {
    let resp = (await authApi.initUser()).data;
    if (resp.user) return resp.user;
  } catch (error) {
    throw "Error";
  }
};

export { login, initAuth };
