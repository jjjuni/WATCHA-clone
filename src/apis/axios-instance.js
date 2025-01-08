import axios from "axios";

const axiosTMDBInstance = axios.create({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_MOVIE_API_URL,
});

const axiosUserInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
});

const axiosLOGInstance = axios.create();

axiosUserInstance.interceptors.request.use(                   // 요청 보내기 전 intercept, 토큰 재설정 후 보냄
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosUserInstance.interceptors.response.use(                  // 받은 응답을 intercept, 에러(토큰 만료) 발생 시 refresh 토큰으로 토큰 재발급
  (response) => { return response; },
  async (error) => {
    const { config, response: { status } } = error;

    if (status === 401 && error.response.data.error === 'Unauthorized') {
      const originRequest = config;

      if (!originRequest._retry) {
        originRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post(import.meta.env.VITE_REFRESH_URL, {}, {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosUserInstance(originRequest);

        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  });

export { axiosTMDBInstance, axiosUserInstance, axiosLOGInstance };
