import { getConfig } from "../config";
import axios from "axios";

class Fetcher {
  proxy: string;

  constructor() {
    this.proxy = getConfig().apiUrl;
  }

  fetchData = async <T>(route: string): Promise<T> => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get<T>(`${this.proxy}${route}`, config);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  postData = async <T>(
    route: string,
    body: any,
    headers?: Record<string, string>
  ): Promise<T> => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
      };

      const response = await axios.post<T>(
        `${this.proxy}${route}`,
        body,
        config
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  deleteData = async <T>(route: string): Promise<T> => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete<T>(`${this.proxy}${route}`, config);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  patchData = async <T>(route: string, body: any): Promise<T> => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch<T>(
        `${this.proxy}${route}`,
        body,
        config
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}

export default Fetcher;
