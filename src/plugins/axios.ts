import axios, {type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

import { useToast } from 'vue-toastification'

const toast = useToast()

// instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api/v1/',
  timeout: 5000,
  // withCredentials: true,
  headers: {
    Accept: 'text/plain',
    'Content-Type': 'application/json',
  },
})

const okStatuses = [200, 201, 204]

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore().accessToken

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  async (error) => {
    const axiosError = await error
    console.error(axiosError)
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
      toast.error(response?.data?.message || 'Something went wrong')
      return Promise.reject(response)
    }

    toast.success(response?.data?.message || 'Successful', {
      toastClassName: 'white-success-toast',
    })
    return response
  },
  async (error) => {
    const axiosError = await error
    console.error('Error object: ' + axiosError)
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

    if (status === 401) {
      message = message || "You haven't logged in, please do it"
    }

    toast.error(message || 'Something went wrong')
    return axiosError
  },
)

export default axiosInstance
