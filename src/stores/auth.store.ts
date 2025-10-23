import { defineStore } from 'pinia'
import axiosInstance from '@/plugins/axios'

import { useUserStore } from './user.store'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    loginData: {
      email: '',
      password: '',
    },
    isLoginPasswordHidden: true,
    registerData: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  }),

  getters: {
    isLoggedin: (state) => state.accessToken.trim() != ''
  },

  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
    },

    async login(payload: {
      email: string;
      password: string
    }) {
      const userStore = useUserStore()

      const body = {
        email: payload.email?.trim() || this.loginData.email?.trim(),
        password: payload.password?.trim() || this.loginData.password?.trim()
      }

      const response = await axiosInstance.post('/Auth/login', body)

      // Response valid
      if (response && response.data) {
        const responseBody = response.data.data

        this.accessToken = responseBody?.accessToken?.trim() || ''
        this.refreshToken = responseBody?.refreshToken?.trim() || ''
        userStore.id = responseBody?.user?.id?.trim() || ''
        userStore.email = responseBody?.user?.email?.trim() || payload.email?.trim() || this.loginData.email?.trim() || ''

        router.push('/home')
      }

      // reset
      this.loginData.email = ''
      this.loginData.password = ''
    },

    async register(payload: {
      email: string;
      password: string;
      confirmPassword: string
    }) {
      const userStore = useUserStore()

      const body = {
        email: payload?.email?.trim() || this.registerData.email?.trim(),
        password: payload?.password?.trim() || this.registerData.password?.trim(),
        confirmPassword: payload?.confirmPassword?.trim() || this.registerData.confirmPassword?.trim()
      }

      const response = await axiosInstance.post('/Auth/register', body)
      // console.log(response)

      if (response && response.data) {
        const responseBody = response.data.data

        this.accessToken = responseBody?.accessToken.trim() || ''
        this.refreshToken = responseBody?.refreshToken.trim() || ''
        userStore.id = responseBody?.user?.id.trim() || ''
        userStore.email = responseBody?.user?.email.trim() || ''

        router.push('/login')
      }
    },

    logout() {
      const userStore = useUserStore()

      this.accessToken = ''
      userStore.id = ''
      userStore.email = ''
      router.push('/login')
    },
  },
})
