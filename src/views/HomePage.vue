<script setup lang="ts">
  import MainContent from '@/components/MainContent.vue'
  import Header from '@/components/Header.vue'

  // import router from '@/router'
  // import { onMounted } from 'vue'
  // import { useAuthStore } from '@/stores/auth'

  // const authStore = useAuthStore()
  // onMounted(() => {
    // if (!authStore.accessToken) {
    //   router.push({ name: 'login' })
    // }
  // })
</script>

<template>
  <div class="relative top-0 h-full">
    <Header />
    <MainContent />
  </div>
</template>
