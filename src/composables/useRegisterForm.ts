// src/composables/useLoginForm.ts
import { useForm } from 'vee-validate'
import { registerSchema } from '@/schemas/register.schema'
import { useAuthStore } from '@/stores/auth.store'
import type { InferType } from 'yup'

type registerSchema = InferType<typeof registerSchema>

export function useRegisterForm() {
  const authStore = useAuthStore()

  // useForm accepts validationSchema (Yup) and initialValues
  const { handleSubmit, values, errors, resetForm, setErrors, setFieldValue } = useForm<registerSchema>({
    validationSchema: registerSchema,
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // submit handler connects form validation to Pinia login action
  const onSubmit = handleSubmit(async (vals) => {
    try {
      await authStore.register(vals)
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
