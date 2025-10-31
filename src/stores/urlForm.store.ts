import { defineStore } from "pinia";
import axiosInstance from "@/plugins/axios";
import { useToast } from "vue-toastification";
const toast = useToast()

export const useUrlFormStore = defineStore("urlForm", {
  state: () => ({
    originalUrl: '',
    shortenedUrl: '',
    isShortLinkCreated: false,
  }),

  getters: {},

  actions: {
    resetFormState() {
      this.originalUrl = ''
      this.isShortLinkCreated = false
    },

    async copyToClipBoard(e: Event) {
      e.preventDefault()
      e.stopPropagation()

      try {
        await navigator.clipboard.writeText(this.shortenedUrl);
        toast.success("Copied to clipboard", {
          toastClassName: 'white-success-toast',
        })
      } catch (err) {
        toast.error('Failed to copy link: ' + err);
      }
    },

    async createShortUrl() {
      const originalUrl = this.originalUrl?.trim()

      if (originalUrl.length === 0) {
        toast.error('You cannot leave this field empty')
        return
      }

      const response = await axiosInstance.post("/urls", {
        originalUrl: originalUrl
      });

      if (response && response.data) {
        const responseBody = response.data.data

        this.isShortLinkCreated = true;
        this.shortenedUrl = responseBody.fullUrl?.trim() || ''
        this.originalUrl = responseBody.originalUrl?.trim() || ''
      }
    }
  }
});
