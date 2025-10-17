<script setup lang="ts">
  const props = defineProps({
    method: {
      type: String,
      default: 'get'
    },
    onSubmit: {
      type: Function,
      default: () => Promise<void>
    }
  })

  async function handleSubmit(payload: SubmitEvent) {
    await props.onSubmit(payload)
  }
</script>

<template>
  <section
    class="
      lg:w-[35%] md:w-[50%] sm:w-[70%] h-fit
      lg:p-8 md:p-6 sm:p-4 lg:mt-4 md:mt-3 sm:mt-2
      bg-white opacity-90 rounded-4xl
    "
  >
    <form
      class="flex flex-col items-start justify-center"
      :method="props.method"
      @submit.prevent="handleSubmit"
    >
      <slot></slot>
    </form>
  </section>
</template>
