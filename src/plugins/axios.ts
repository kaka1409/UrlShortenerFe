import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

import { useToast } from 'vue-toastification'

const toast = useToast()
// const baseURL = 'https://urlshortener-api-5ts0.onrender.com/api/v1/'
const baseURL = 'https://thang.tail704409.ts.net/api/v1/'
// const baseURL = 'http://localhost:80/api/v1/'

// instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true, // Allow cookies request
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
})

const okStatuses = [200, 201, 204]

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore()?.accessToken || ''
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  async (error) => {
    const axiosError = await error
    console.log('Error object: ')
    console.log(axiosError)
    console.log(
      `ERROR_LOG:
      - ERROR_STATUS: ${axiosError.status}
      - ERROR_MESSAGE: ${axiosError.message}
      - ERRO_STACK: ${axiosError.stack}
      - ERROR_RESPONSE_MESSAGE: ${axiosError?.response?.data?.error}
    `,
    )

    toast.error(axiosError?.response?.data?.error || 'Something went wrong')
    return axiosError
  },
)

// response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!okStatuses.includes(response.status)) {
      toast.error(response?.data?.message.trim() || 'Something went wrong')
      return Promise.reject(response)
    }

    toast.success(response?.data?.message.trim() || 'Successful', {
      toastClassName: 'white-success-toast',
    })
    return response
  },
  async (error) => {
    const axiosError = await error
    console.log('Error object: ')
    console.log(axiosError)
    console.log(
      `ERROR_LOG:
      - ERROR_STATUS: ${axiosError.status}
      - ERROR_MESSAGE: ${axiosError.message}
      - ERRO_STACK: ${axiosError.stack}
      - ERROR_RESPONSE_MESSAGE: ${axiosError?.response?.data?.error}
    `,
    )

    const status = axiosError?.response?.status
    let message = axiosError?.response?.data?.error

    if (status === 401 && !axiosError.config._retry) {
      axiosError.config._retry = true

      const accessToken = useAuthStore().accessToken.trim()

      if (accessToken === '') {
        useAuthStore().setAccessToken('')
        message = message || "You haven't logged in, please do it"
        toast.error(message || 'Something went wrong')
        return axiosError
      }

      if (accessToken) {
        const response = await axios.post(baseURL + 'Auth/refresh', {}, { withCredentials: true })
        const newAccessToken = response?.data?.accessToken.trim()

        if (newAccessToken) {
          useAuthStore().setAccessToken(newAccessToken)
          axiosError.config.headers.Authorization = `Bearer ${newAccessToken}`
        }
        return axiosInstance(axiosError.config)
      }
    }

    toast.error(message || 'Something went wrong')
    return axiosError
  },
)

export default axiosInstance
