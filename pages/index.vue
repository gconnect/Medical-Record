<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-md navbar-light bg-white d-md-none border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand text-primary fw-bold" href="#">
          <img src="/assets/images/logo.png" width="150px"/>
        </a>
        <div>
           <button type="button" class="btn btn-sm position-relative me-2">
            <i class="fas fa-envelope"></i>
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>
          <button type="button" class="btn btn-sm me-3">
            <i class="fas fa-bell"></i>
          </button>
          <button 
          class="navbar-toggler" 
          type="button" 
          @click="toggleMobileMenu"
          aria-controls="mobileSidebar" 
          :aria-expanded="showMobileMenu"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        </div>   
      </div>
    </nav>

    <div class="row min-vh-100">
      <nav class="col-md-3 col-lg-2 d-md-block sidebar" :class="{ 'show': showMobileMenu }" id="mobileSidebar">
        <div class="position-sticky pt-3" :class="{ 'mt-5': !showMobileMenu, 'mt-2': showMobileMenu }">
          <ul class="nav flex-column">
            <li class="nav-item dashboard-sidebar text-secondary">
              <a class="nav-link active text-white fw-bold" href="#" @click="closeMobileMenu">
                <i class="fas fa-th-large me-2"></i>
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu">
                <i class="fas fa-user me-2"></i>
                Profile
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu" data-bs-toggle="collapse" data-bs-target="#servicesSubmenu">
                <i class="fas fa-cog me-2"></i>
                Services
                <i class="fas fa-chevron-down ms-auto"></i>
              </a>
              <div class="collapse" id="servicesSubmenu">
                <ul class="nav flex-column ms-3">
                  <li class="nav-item">
                    <a class="nav-link text-secondary small" href="#" @click="closeMobileMenu">Service 1</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-secondary small" href="#" @click="closeMobileMenu">Service 2</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu">
                <i class="fas fa-file-medical me-2"></i>
                Medical Records
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu">
                <i class="fas fa-wallet me-2"></i>
                Care Wallet
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu">
                <i class="fas fa-envelope me-2"></i>
                Messages
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu">
                <i class="fas fa-book me-2"></i>
                Resources
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu">
                <i class="fas fa-cog me-2"></i>
                Account Settings
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu">
                <i class="fas fa-life-ring me-2"></i>
                Contact Support
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" @click="closeMobileMenu">
                <i class="fas fa-sign-out-alt me-2"></i>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <div class="mt-md-5">
            <h1 class="h2 text-primary fw-bold mt-5">Update Patient Medical Record</h1>
            <p class="text-muted">Click the tabs to view and edit patient medical details</p>
          </div>
          <div class="d-none d-md-flex align-items-center flex-nowrap">
            <div class="btn-group me-2">
              <button type="button" class="btn  btn-sm">
                <i class="fas fa-question-circle me-1"></i>
                Take a tour
              </button>
              <button type="button" class="btn  btn-sm position-relative">
                <i class="fas fa-envelope"></i>
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
              <button type="button" class="btn  btn-sm">
                <i class="fas fa-bell"></i>
              </button>
            </div>
            <div class="dropdown">
              <img src="/assets/images/profile-pix.png" width="30px" class="rounded-circle me-1" alt="Profile">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card shadow-sm border-0">
              <div class="card-body p-4">
                <div v-if="isLoading" class="text-center py-5">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <p class="mt-3 text-muted">Loading investigations...</p>
                </div>

                <div v-else-if="error" class="alert alert-danger" role="alert">
                  <i class="fas fa-exclamation-triangle me-2"></i>
                  Error loading investigations: {{ error.message }}
                  <button @click="refresh" class="btn btn-outline-danger btn-sm ms-2">
                    <i class="fas fa-redo me-1"></i>
                    Retry
                  </button>
                </div>

                <div v-else>
                  <div v-if="showValidationAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <strong>Validation Error!</strong> Please select at least one investigation or specify CT scan/MRI details before submitting.
                    <button type="button" class="btn-close" @click="closeValidationAlert" aria-label="Close"></button>
                  </div>

                  <div v-for="(categoryInvestigations, categoryName) in filteredInvestigations" :key="categoryName" class="mb-4">
                    <h4 class="text-primary fw-bold mb-3">{{ categoryName }}</h4>              
                    <div class="row g-3">
                      <div 
                        v-for="investigation in categoryInvestigations" 
                        :key="investigation.id"
                        class="col-12 col-md-6 col-lg-3"
                      >
                        <div class="form-check">
                          <input 
                            :id="`investigation-${investigation.id}`"
                            class="form-check-input" 
                            type="checkbox" 
                            :value="investigation.id"
                            :checked="selectedInvestigations.includes(investigation.id)"
                            @change="toggleInvestigation(investigation.id)"
                          >
                          <label 
                            :for="`investigation-${investigation.id}`" 
                            class="form-check-label text-secondary"
                          >
                            {{ investigation.title }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-md-6">
                      <label for="ctScan" class="form-label text-primary fw-bold">CT Scan</label>
                      <select id="ctScan" class="form-select" v-model="ctScan">
                        <option value="">*Specify</option>
                        <option value="head">Head CT</option>
                        <option value="chest">Chest CT</option>
                        <option value="abdomen">Abdomen CT</option>
                        <option value="pelvis">Pelvis CT</option>
                        <option value="spine">Spine CT</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="mri" class="form-label text-primary fw-bold">MRI</label>
                      <select id="mri" class="form-select" v-model="mri">
                        <option value="">*Specify</option>
                        <option value="brain">Brain MRI</option>
                        <option value="spine">Spine MRI</option>
                        <option value="knee">Knee MRI</option>
                        <option value="shoulder">Shoulder MRI</option>
                        <option value="cardiac">Cardiac MRI</option>
                      </select>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end mt-4">
                    <button 
                      @click="submitInvestigations" 
                      class="btn btn-primary px-4 py-2"
                      :disabled="isSubmitting"
                    >
                      <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                      <i v-else class="fas fa-paper-plane me-2"></i>
                      {{ isSubmitting ? 'Saving...' : 'Save and Send' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div 
      v-if="showMobileMenu" 
      class="mobile-backdrop d-md-none"
      @click="closeMobileMenu"
    ></div>

    <div 
      class="modal fade" 
      id="successModal" 
      tabindex="-1" 
      aria-labelledby="successModalLabel" 
      aria-hidden="true"
      :class="{ show: showSuccessModal }"
      :style="{ display: showSuccessModal ? 'block' : 'none' }"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 id="successModalLabel" class="modal-title text-success">
              <i class="fas fa-check-circle me-2"></i>
              Success!
            </h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Medical record has been successfully updated and sent.</p>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-primary" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="showSuccessModal" 
      class="modal-backdrop fade show"
      @click="closeModal"
    ></div>
  </div>
</template>

<script setup>
import { useInvestigations } from '~/composables/useInvestigations'

const {
  isLoading,
  error,
  filteredInvestigations,
  selectedInvestigations,
  isSubmitting,
  showSuccessModal,
  submitInvestigations,
  refresh,
  toggleInvestigation,
  mri,
  ctScan,
  showValidationAlert,
  closeValidationAlert
} = useInvestigations()

const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const closeModal = () => {
  showSuccessModal.value = false
}

watch(showSuccessModal, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
    console.log('Modal should be visible now')
  } else {
    document.body.classList.remove('modal-open')
  }
})

onUnmounted(() => {
  document.body.classList.remove('modal-open')
})

useHead({
  title: 'Update Patient Medical Record',
  meta: [
    { name: 'description', content: 'Update and manage patient medical records' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
      type: 'text/javascript'
    }
  ]
})
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  background-color: white !important;
  border-right: 1px solid #dee2e6;
}

.nav {
  background-color: white;
  color: black;
}

.sidebar .nav-link {
  color: rgba(255, 255, 255, 0.75);
  transition: all 0.3s ease;
}

.sidebar .nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar .nav-link.active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
}

.card {
  border-radius: 12px;
}

.dashboard-sidebar {
  background-color: #2A36A4;
  margin-top: 48px;
}

.form-check-input:checked {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

.form-check-label {
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-primary {
  background-color: #4f46e5;
  border-color: #4f46e5;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #4338ca;
  border-color: #4338ca;
}

.text-primary {
  color: #4f46e5 !important;
}

.bg-primary {
  background-color: #4f46e5 !important;
}

.alert {
  animation: slideInDown 0.3s ease-in-out;
}

@keyframes slideInDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.mobile-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1020;
}

.modal.show {
  display: block !important;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}

.navbar {
  z-index: 1030;
}

.navbar-brand {
  font-size: 1.1rem;
}

.navbar-toggler {
  border: none;
  padding: 0.25rem 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.sidebar {
  min-height: 100vh;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  background-color: white !important;
  border-right: 1px solid #dee2e6;
  transition: transform 0.3s ease-in-out;
}

@media (max-width: 767.98px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    transform: translateX(-100%);
    z-index: 1025;
    background-color: white !important;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    overflow-y: auto;
  }
  
  .sidebar.show {
    transform: translateX(0);
  }
  
  .col-md-9.ms-sm-auto {
    margin-left: 0 !important;
  }
  
  .sidebar.show::before {
    content: '';
    position: fixed;
    top: 0;
    left: 280px;
    width: calc(100vw - 280px);
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}
</style>