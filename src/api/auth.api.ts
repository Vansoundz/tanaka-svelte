import Axios from "axios";
import { backend } from "../config";

export const authHeader = () => {
  return { "tanaka-auth": localStorage.__tanaka };
};

export default {
  login(user: { email: string; password: string }) {
    return Axios.post(`${backend}/api/users/login`, user);
  },
  initUser() {
    return Axios.get(`${backend}/api/users`, {
      headers: authHeader(),
    });
  },
};
