import type { Investigation } from '~/types';

export const useInvestigations = () => {
    const investigations = ref<Investigation[]>([]);
    const selectedInvestigations = ref<string[]>([]);
    const searchQuery = ref('');
    const selectedCategory = ref('');
    const showSuccessModal = ref(false);
    const isSubmitting = ref(false);
    const isLoading = ref(false);
    const error = ref<Error | null>(null);
    const ctScan = ref('');
    const mri = ref('');
    const showValidationAlert = ref(false)

    const fetchInvestigations = async () => {
        try {
            isLoading.value = true;
            const response = await GqlGetInvestigations(); 
            console.log(response);

            investigations.value = response.investigations;
        } catch (e: any) { 
            console.error('Error fetching investigations:', e); 
            error.value = e instanceof Error ? e : new Error(e.message || 'An unknown error occurred');
        } finally {
            isLoading.value = false; 
        }
    };

    const filteredInvestigations = computed(() => {
        try {
            if (!investigations.value?.length) {
                return {};
            }
            
            return investigations.value.reduce((groups, investigation) => {
                const typeTitle = investigation?.type?.title;
                if (!typeTitle) {
                    console.warn('Investigation missing type title:', investigation);
                    return groups;
                }
                
                if (!groups[typeTitle]) {
                    groups[typeTitle] = [];
                }
                groups[typeTitle].push(investigation);
                return groups;
            }, {} as Record<string, Investigation[]>);
        } catch (error) {
            console.error('Error grouping investigations:', error);
            return {};
        }
    });

     const submitInvestigations = async () => {
          if (selectedInvestigations.value.length === 0 && !ctScan.value && !mri.value) {
                showValidationAlert.value = true
                setTimeout(() => {
                showValidationAlert.value = false
                }, 5000)
                return
            }
            showValidationAlert.value = false

        try {
            isSubmitting.value = true;
            const plainInvestigations = [...selectedInvestigations.value];
            
            const payload = {
                investigations: JSON.parse(JSON.stringify(selectedInvestigations.value)),
                ctscan: ctScan.value || "Not specified",
                mri: mri.value || "Not specified",
                developer: "gconnect"
            };

            console.log('Submitting payload:', payload);
            console.log('Plain investigations array:', plainInvestigations);

          const response = await GqlAddMedicalRecord(payload);
                console.log("medical record", response)
                isSubmitting.value = false
           
                selectedInvestigations.value = [];
                ctScan.value = '';
                mri.value = '';       
            showSuccessModal.value = true;
            console.log("showModal", showSuccessModal.value)
            console.log("submitting", isSubmitting.value)

        } catch (err) {
            isSubmitting.value = false;
            console.error('Error submitting investigations:', err);
        }
    };

    const toggleInvestigation = (investigationId: string) => {
        const index = selectedInvestigations.value.indexOf(investigationId);
        if (index > -1) {
            selectedInvestigations.value.splice(index, 1);
        } else {
            selectedInvestigations.value.push(investigationId);
        }
    };

    const refresh = () => {
        fetchInvestigations();
    };

    const resetForm = () => {
        selectedInvestigations.value = [];
        ctScan.value = '';
        mri.value = '';
        showSuccessModal.value = false;
    };

    const closeValidationAlert = () => {
        showValidationAlert.value = false
    }

    onMounted(async () => {
        await fetchInvestigations();
    });

    return {
        investigations,
        isLoading,
        error,
        fetchInvestigations,
        filteredInvestigations,
        selectedInvestigations,
        isSubmitting,
        showSuccessModal,
        searchQuery,
        selectedCategory,
        ctScan,
        mri,
        submitInvestigations,
        refresh,
        toggleInvestigation,
        resetForm,
        showValidationAlert,
        closeValidationAlert
    };
};