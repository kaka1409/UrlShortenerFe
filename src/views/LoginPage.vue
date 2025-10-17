<script setup lang="ts">
  import BackButton from '@/components/BackButton.vue'
  import InputField from '../components/InputField.vue'
  import Form from '../components/Form.vue'

  import { useLoginForm } from '@/composables/useLoginForm'
  const { onSubmit, values, errors, setFieldValue} = useLoginForm()
</script>

<template>
  <section class="relative top-0 h-full w-full flex flex-col justify-center items-center gap-2">
    <BackButton text="Back to home" />
    <h1 class="text-5xl text-white font-bold">LOGIN</h1>

    <Form method="post" :onSubmit="onSubmit">
      <div class="w-full">
        <InputField
          labelText="Email:"
          name="email"
          type="text"
          :modelValue="values.email"
          @update:modelValue="val => setFieldValue('email', val)"
          placeholder="Enter your email"
          :errorMessage="errors.email"
        />

        <InputField
          labelText="Password:"
          name="password"
          type="password"
          :modelValue="values.password"
          @update:modelValue="val => setFieldValue('password', val)"
          placeholder="Enter your password"
          :errorMessage="errors.password"
          :autoComplete="false"
          :autoCorrect="false"
        />

        <button
          class="
            w-full h-14 mt-4 bg-black-violet rounded-2xl text-white text-lg font-semibold
            hover:cursor-pointer hover:opacity-60 transition-all duration-200"
          type="submit"
        >Login</button>

        <div class="flex items-center justify-center gap-2 mt-4">
          <span class="font-md">Don't have an account?</span>
          <RouterLink
            to="/register"
            class="
              text-black-violet font-bold text-md
              hover:cursor-pointer hover:opacity-40 transition-all duration-200"
            >Register</RouterLink>
        </div>
      </div>
    </Form>
  </section>
</template>
