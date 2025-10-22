<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth.store';
  import { useUserStore } from '@/stores/user.store';

  const authStore = useAuthStore()
  const userStore = useUserStore()

</script>

<template>
  <header
    class="
      absolute top-0 w-full h-25 px-8 py-2
      text-xl text-white font-bold
      flex flex-wrap items-center lg:justify-between md:justify-between justify-around gap-4
      bg-gradient-to-b from-white/25 to-black-violet
    "
  >
    <h1 class="text-4xl font-bold">LOCALHOST</h1>

    <div v-if="!authStore.isLoggedin"
      class="flex items-center justify-center gap-4">
      <RouterLink
        to="/login"
        class="
          px-4 py-2 border-2 border-white rounded-xl
          hover:cursor-pointer hover:bg-white hover:text-black transition-all duration-300
        "
      >
        Login
      </RouterLink>

      <RouterLink
        to="/register"
        class="
          bg-white text-black-violet px-4 py-2 rounded-xl border-2 border-white/0
          hover:cursor-pointer hover:bg-white/0 hover:border-white hover:text-white/100 transition-all duration-300
        "
      >
        Sign up
      </RouterLink>
    </div>

    <div
      v-else
      class="flex items-center justify-center gap-2 py-2"
    >
      <span class="">
        {{ userStore.email }}
      </span>
      <div class="rounded-full w-10 h-10 text-white font-md bg-violet-700 flex items-center justify-center text-center">{{ userStore.avartarChar }}</div>
    </div>
  </header>
</template>
