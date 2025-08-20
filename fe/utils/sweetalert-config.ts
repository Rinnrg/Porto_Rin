// SweetAlert2 configuration for the portfolio project
import Swal from 'sweetalert2';

export const configureSweetAlert = () => {
  // Set default configuration for SweetAlert
  Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    showCloseButton: true,
    timer: undefined,
    timerProgressBar: false,
  });
};

// Common SweetAlert configurations
export const swalConfig = {
  success: {
    icon: 'success' as const,
    confirmButtonColor: '#28a745',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  },
  
  error: {
    icon: 'error' as const,
    confirmButtonColor: '#dc3545',
    showConfirmButton: true,
  },
  
  warning: {
    icon: 'warning' as const,
    confirmButtonColor: '#ffc107',
    showCancelButton: true,
    confirmButtonText: 'Yes, proceed',
    cancelButtonText: 'Cancel',
  },
  
  info: {
    icon: 'info' as const,
    confirmButtonColor: '#17a2b8',
    showConfirmButton: true,
  },
  
  question: {
    icon: 'question' as const,
    confirmButtonColor: '#007bff',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  },
};

// Helper functions for common SweetAlert patterns
export const showSuccess = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    ...swalConfig.success,
  });
};

export const showError = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    ...swalConfig.error,
  });
};

export const showWarning = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    ...swalConfig.warning,
  });
};

export const showInfo = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    ...swalConfig.info,
  });
};

export const showConfirm = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    ...swalConfig.question,
  });
};

export const showLoading = (title = 'Loading...', text?: string) => {
  return Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoading = () => {
  Swal.close();
};
