<template>
  <div class="container-fluid">
    <div class="row min-vh-100">
      <nav class="col-md-3 col-lg-2 d-md-block sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item dashboard-sidebar text-secondary">
              <a class="nav-link active text-white fw-bold" href="#">
                <i class="fas fa-th-large me-2"></i>
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#">
                <i class="fas fa-user me-2"></i>
                Profile
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#" data-bs-toggle="collapse" data-bs-target="#servicesSubmenu">
                <i class="fas fa-cog me-2"></i>
                Services
                <i class="fas fa-chevron-down ms-auto"></i>
              </a>
              <div class="collapse" id="servicesSubmenu">
                <ul class="nav flex-column ms-3">
                  <li class="nav-item">
                    <a class="nav-link text-secondary small" href="#">Service 1</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-secondary small" href="#">Service 2</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#">
                <i class="fas fa-file-medical me-2"></i>
                Medical Records
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#">
                <i class="fas fa-wallet me-2"></i>
                Care Wallet
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#">
                <i class="fas fa-envelope me-2"></i>
                Messages
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#">
                <i class="fas fa-book me-2"></i>
                Resources
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#">
                <i class="fas fa-cog me-2"></i>
                Account Settings
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#">
                <i class="fas fa-life-ring me-2"></i>
                Contact Support
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-secondary" href="#">
                <i class="fas fa-sign-out-alt me-2"></i>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <div class="mt-5">
            <h1 class="h2 text-primary fw-bold">Update Patient Medical Record</h1>
            <p class="text-muted">Click the tabs to view and edit patient medical details</p>
          </div>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group me-2">
              <button type="button" class="btn btn-outline-secondary btn-sm">
                <i class="fas fa-question-circle me-1"></i>
                Take a tour
              </button>
              <button type="button" class="btn btn-outline-secondary btn-sm position-relative">
                <i class="fas fa-envelope"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
              <button type="button" class="btn btn-outline-secondary btn-sm">
                <i class="fas fa-bell"></i>
              </button>
            </div>
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown">
                <img src="https://via.placeholder.com/32x32" class="rounded-circle me-1" alt="Profile">
                Glory
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
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
                      :disabled="isSubmitting || selectedInvestigations.length === 0"
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
    <div class="modal fade" id="successModal" tabindex="-1" v-if="showSuccessModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title text-success">
              <i class="fas fa-check-circle me-2"></i>
              Success!
            </h5>
            <button type="button" class="btn-close" @click="showSuccessModal = false"></button>
          </div>
          <div class="modal-body">
            <p>Medical record has been successfully updated and sent.</p>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-primary" @click="showSuccessModal = false">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
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
  ctScan
} = useInvestigations()

watch(showSuccessModal, (newValue) => {
  if (newValue) {
    const modal = new bootstrap.Modal(document.getElementById('successModal'))
    modal.show()
  }
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

@media (max-width: 767.98px) {
  .sidebar {
    min-height: auto;
  }
  
  .col-md-9.ms-sm-auto {
    margin-left: 0 !important;
  }
}
</style>