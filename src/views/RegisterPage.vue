<script setup lang="ts">
  import BackButton from '@/components/BackButton.vue'
  import InputField from '../components/InputField.vue'
  import Form from '../components/Form.vue'

  import { useRegisterForm } from '@/composables/useRegisterForm'
  const { onSubmit, values, errors, setFieldValue} = useRegisterForm()
</script>

<template>
  <section class="h-full w-full flex flex-col justify-center items-center gap-2">
    <BackButton text="Back to home" />
    <h1 class="lg:text-5xl md:text-4xl sm:text-3xl text-white font-bold">SIGN UP</h1>

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
          :autoComplete="false"
          :autoCorrect="false"
          :errorMessage="errors.password"
        />

        <InputField
          labelText="Confirm password:"
          name="confirmPassword"
          type="password"
          :modelValue="values.confirmPassword"
          @update:modelValue="val => setFieldValue('confirmPassword', val)"
          placeholder="Confirm your password"
          :autoComplete="false"
          :autoCorrect="false"
          :errorMessage="errors.confirmPassword"
        />

        <button
          class="w-full h-14 mt-4 bg-black-violet rounded-2xl text-white text-lg font-semibold hover:cursor-pointer hover:opacity-60 transition-all duration-200"
          type="submit"
        >
          Sign up
        </button>

        <div class="flex items-center justify-center gap-2 mt-4">
          <span class="font-md">Already have an account?</span>
          <RouterLink
            to="/login"
            class="text-black-violet font-bold text-md hover:cursor-pointer hover:opacity-60 transition-all duration-200"
            >Login</RouterLink
          >
        </div>
      </div>
    </Form>
  </section>
</template>
