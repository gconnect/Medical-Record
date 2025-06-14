<template>
  <div class="login-container d-flex align-items-center justify-content-center min-vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <h2 class="card-title text-dark">Welcome Back</h2>
                <p class="text-muted">Please sign in to your account</p>
              </div>
              
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': emailError }"
                    placeholder="Enter your email"
                    required
                  />
                  <div v-if="emailError" class="invalid-feedback">
                    {{ emailError }}
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': passwordError }"
                    placeholder="Enter your password"
                    required
                  />
                  <div v-if="passwordError" class="invalid-feedback">
                    {{ passwordError }}
                  </div>
                </div>
                
                <div class="mb-3 form-check">
                  <input
                    id="remember"
                    v-model="rememberMe"
                    type="checkbox"
                    class="form-check-input"
                  />
                  <label class="form-check-label" for="remember">
                    Remember me
                  </label>
                </div>
                
                <div v-if="loginError" class="alert alert-danger" role="alert">
                  {{ loginError }}
                </div>
                
                <button
                  type="submit"
                  class="btn btn-purple w-100 py-2"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ isLoading ? 'Signing in...' : 'Sign In' }}
                </button>
              </form>
              
              <div class="text-center mt-4">
                <a href="#" class="text-decoration-none">Forgot your password?</a>
              </div>
              
              <div class="text-center mt-3">
                <span class="text-muted">Don't have an account? </span>
                <a href="#" class="text-decoration-none">Sign up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

const { 
  login, 
  isLoading, 
  email, 
  password, 
  loginError,
  emailError,
  passwordError 
 } = useAuth()


</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.card {
  border: none;
  border-radius: 15px;
}

.btn-purple {
  background-color: #6f42c1;
  border-color: #6f42c1;
  color: white;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-purple:hover {
  background-color: #5a2d91;
  border-color: #5a2d91;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(111, 66, 193, 0.3);
}

.btn-purple:focus {
  background-color: #5a2d91;
  border-color: #5a2d91;
  color: white;
  box-shadow: 0 0 0 0.2rem rgba(111, 66, 193, 0.25);
}

.btn-purple:disabled {
  background-color: #6f42c1;
  border-color: #6f42c1;
  opacity: 0.7;
}

.form-control:focus {
  border-color: #6f42c1;
  box-shadow: 0 0 0 0.2rem rgba(111, 66, 193, 0.25);
}

.form-check-input:checked {
  background-color: #6f42c1;
  border-color: #6f42c1;
}

.form-check-input:focus {
  border-color: #6f42c1;
  box-shadow: 0 0 0 0.2rem rgba(111, 66, 193, 0.25);
}

a {
  color: #6f42c1;
}

a:hover {
  color: #5a2d91;
}
</style>