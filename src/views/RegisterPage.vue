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

    <Form method="post" :onSubmit="onSubmit" submitButtonText="Sign up">
      <template v-slot:fieldsContainer>
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

      </template>

      <template v-slot:formFooter>
        <div class="flex items-center justify-center w-full gap-2 mt-4">
          <span class="font-md lg:text-lg text-sm">Already have an account?</span>
          <RouterLink
            to="/register"
            class="
              text-black-violet font-bold lg:text-lg sm:text-md text-sm
              hover:cursor-pointer hover:opacity-40 transition-all duration-200"
            >Login</RouterLink>
        </div>
      </template>
    </Form>
  </section>
</template>
