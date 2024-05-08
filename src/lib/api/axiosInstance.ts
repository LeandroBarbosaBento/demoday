import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const axiosInstance = axios.create({
  baseURL: 'https://demoday-api.onrender.com/',
  withCredentials: true
})

const requestHandler = (requestConfig: AdaptAxiosRequestConfig) => {
  try {
    const token = ''
    if (token) requestConfig.headers.Authorization = `bearer ${token}`;
  } catch (e) {}
  return requestConfig
}

axiosInstance.interceptors.request.use((requestConfig) => requestHandler(requestConfig))

export default axiosInstance
