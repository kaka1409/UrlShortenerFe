// src/composables/useLoginForm.ts
import { useForm } from 'vee-validate'
import { loginSchema } from '@/schemas/login.schema'
import { useAuthStore } from '@/stores/auth.store'
import type { InferType } from 'yup'

type LoginFormValues = InferType<typeof loginSchema>

export function useLoginForm() {
  const authStore = useAuthStore()

  // useForm accepts validationSchema (Yup) and initialValues
  const { handleSubmit, values, errors, resetForm, setErrors, setFieldValue } = useForm<LoginFormValues>({
    validationSchema: loginSchema,
    initialValues: {
      email: '',
      password: '',
    },
  })

  // submit handler connects form validation to Pinia login action
  const onSubmit = handleSubmit(async (vals) => {
    try {
      await authStore.login(vals)
      resetForm()
    } catch (err: any) {
      if (err?.fieldErrors) {
        setErrors(err.fieldErrors)
      } else {
        console.error('Failed to login user: ' + err)
      }
    }
  })

  return {
    onSubmit,
    values,
    errors,
    authStore,
    setFieldValue
  }
}
