import axios from "axios";

const baseURL: string = import.meta.env.VITE_APP_BASE_URL;

const request = axios.create({
  baseURL,
  timeout: 30000
});

export const initRequestInterceptor = (req: any) => {
  req.headers = {
    ...(req.headers || {}),
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("accessToken") || ""}`
  };

  return req;
};

const refreshToken = async () => {
  const refreshTokenAPI = axios.create({
    baseURL
  });

  refreshTokenAPI.interceptors.request.use(initRequestInterceptor);

  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const { data } = await refreshTokenAPI.post("/admin/refresh", {
      refreshToken: refreshToken,
      Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`
    });
    const { accessToken: accessToken } = data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

const initResponseInterceptor = () => {
  return [
    (response: any) => response,
    async (error: unknown | any) => {
      const config = error?.config;
      const errorCode = error?.response?.data?.error?.code;

      if (errorCode === "TOKEN_EXPIRED" && !config._attempted) {
        config._attempted = true;
        try {
          const newAccessToken = await refreshToken();

          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(config);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  ];
};

request.interceptors.request.use(initRequestInterceptor);
request.interceptors.response.use(...initResponseInterceptor());

export const httpClient = request;