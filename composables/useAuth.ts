import { useMutation } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

export const useAuth = () => {
    const isLoading = ref(false)
    const user = ref(null)
    const token = ref(null)
    const error = ref(null)
    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const emailError = ref('')
    const passwordError = ref('')
    const loginError = ref('')


  const login = async () => {
      if (!validateForm()) {
      isLoading.value = false
      return { success: false, error: 'Please fix the form errors' }
    }
    try {
       isLoading.value = true
      error.value = null
      const response = await GqlLoginUser({
        email: email.value,
        password: password.value,
      })
        isLoading.value = false
        console.log('Login response:', response)
      return response;
    }catch(e) {
        isLoading.value = false
        loginError.value = 'An unexpected error occurred. Please try again.'
        console.error('Login error:', error)
      }
  }

const validateForm = () => {
  emailError.value = ''
  passwordError.value = ''
  loginError.value = ''
  
  let isValid = true
  
  if (!email.value) {
    emailError.value = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Please enter a valid email'
    isValid = false
  }
  
  if (!password.value) {
    passwordError.value = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid

}
  return {
    login,
    email,
    password,
    isLoading,
    loginError, 
    emailError,
    passwordError
  }


}