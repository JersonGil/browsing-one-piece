import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://dragonball-api.com/api/',
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
