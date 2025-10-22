<script setup lang="ts">
  import Header from '@/components/Header.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <Header></Header>
  <div class="h-full w-full flex flex-col justify-center items-center gap-4">
    <h1 class="text-6xl text-white font-bold">404, NOT FOUND</h1>
    <p class="text-white text-xl">Page / URL not exist, seem like you are lost</p>
    <RouterLink to="/" class="
      font-bold text-lg text-white px-4 py-2 rounded-lg border-2 border-white
      hover:cursor-pointer hover:bg-white hover:text-black-violet transition-all duration-300
    ">Back to home</RouterLink>
  </div>
</template>
