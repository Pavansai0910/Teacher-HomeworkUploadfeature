import axios from "axios";
export const axiosInstance = axios.create({
});

export const apiConnector = (method, url, bodyData, headers = null, params = {}, responseType = '') => {
  const BASE_URL = process.env.VITE_SERVER_BASE_URL + "/api";
   return axiosInstance({
      method,
      url: `${BASE_URL}${url}`,
      data: bodyData || null,
      headers: headers, 
      params: params || {},
      responseType: responseType || undefined,
    });
};