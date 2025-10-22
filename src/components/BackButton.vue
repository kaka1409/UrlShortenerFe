<script setup lang="ts">
  import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

  const props = defineProps({
    destination: {
      type: String,
      default: '/'
    },
    text: {
      type: String,
      default: 'Back'
    }
  })
</script>

<template>
  <RouterLink
    :to="props.destination"
    class="
      absolute lg:top-4 lg:left-4 top-2 left-0 flex items-center justify-center gap-0.5
      px-4 py-3 text-white font-sm lg:text-xl md:text-lg text-md rounded-full
      hover:cursor-pointer hover:bg-white/20 hover:text-gray transition-all duration-300
    "
  >
    <ChevronLeftIcon class="w-5 h-5"/>
    <span class="leading-none font-medium">{{ props.text }}</span>
  </RouterLink>
</template>
