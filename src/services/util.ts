import Axios from "axios";
import { authHeader } from "../api/auth.api";
import { backend } from "../config";

const getId = () => Math.random().toString();

interface Req {
  endpoint: string;
  method: "GET" | "POST" | "PATCH";
  auth?: boolean;
  body?: object;
}

const sendReq = async ({ endpoint, method, auth, body }: Req) => {
  try {
    let res;
    switch (method) {
      case "GET":
        res = await Axios.get(`${backend}/api${endpoint}`, {
          headers: auth ? authHeader() : {},
        });
        break;

      case "POST":
        res = await Axios.post(`${backend}/api${endpoint}`, body, {
          headers: auth ? authHeader() : {},
        });
        break;

      case "PATCH":
        res = await Axios.patch(`${backend}/api${endpoint}`, body, {
          headers: auth ? authHeader() : {},
        });
        break;

      default:
        throw "Method must be provided";
    }
    return res.data;
  } catch (error) {
    if (error.response.data) throw error.response.data.errors;
    throw error;
  }
};

export { getId, sendReq };
