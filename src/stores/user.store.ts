import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    email: "",
  }),

  getters: {
    avartarChar: (state) => state.email.charAt(0).toUpperCase(),
  },

  actions: {

  }
});
