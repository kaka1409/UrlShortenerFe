<script setup lang="ts">
  const props = defineProps({
    method: {
      type: String,
      default: 'get'
    },
    onSubmit: {
      type: Function,
      default: () => Promise<void>
    },
    submitButtonText: {
      type: String,
      default: 'Submit'
    },
  })

  async function handleSubmit(payload: SubmitEvent) {
    await props.onSubmit(payload)
  }
</script>

<template>
  <section
    class="
      2xl:w-[30%] xl:w-[40%] lg:w-[50%] md:w-[60%] w-[90%] h-fit
      lg:p-8 md:p-6 sm:p-4 p-3 lg:mt-4 md:mt-3 sm:mt-2 mt-1
      lg:rounded-4xl md:rounded-3xl sm:rounded-2xl rounded-xl
      bg-white opacity-90
    "
  >
    <form
      class="flex flex-col items-start justify-center"
      :method="props.method"
      @submit.prevent="handleSubmit"
    >
      <slot name="fieldsContainer"></slot>
      <button
        class="
          w-full lg:h-14 h-12 lg:mt-4 md:mt-3 mt-2 bg-black-violet
          lg:rounded-2xl rounded-lg text-white lg:text-lg text-md font-semibold
          hover:cursor-pointer hover:opacity-60 transition-all duration-200"
        type="submit"
      >{{ props.submitButtonText }}</button>
      <slot name="formFooter"></slot>
    </form>
  </section>
</template>
