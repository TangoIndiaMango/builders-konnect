import axios from 'axios';

export const baseUrl = 'https://api.builderskonnect.sbscuk.co.uk/api/v1/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
});

const attachTokenAndTenantID = (config: any) => {
  const token = sessionStorage.getItem('access_token');
  const tenantId = sessionStorage.getItem('tenant_id');

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (tenantId) config.headers['X-Tenant-ID'] = tenantId;

  return config;
};

let isShowingError = false;
const errorResetTimeout = 5000; // 5 seconds

const handleError = (error: any) => {
  if (!error.response) {
    console.log('Network error or server is unreachable.');
    return Promise.reject(new Error('Network error or server is unreachable.'));
  }

  const { status, data } = error.response;
  const messages: Record<number, string> = {
    400: 'Bad Request: Please check your input.',
    401: 'Unauthorized: Please log in again.',
    403: 'Forbidden: You do not have access to this resource.',
    404: 'Not Found: The resource was not found.',
    500: 'Internal Server Error: Please try again later.',
  };

  const errorMessage =
    data?.message ||
    messages[status as keyof typeof messages] ||
    'An unexpected error occurred.';

  if (!isShowingError) {
    isShowingError = true;
    setTimeout(() => {
      isShowingError = false;
    }, errorResetTimeout);
  }

  return Promise.reject(new Error(errorMessage));
};

// Add interceptors
axiosInstance.interceptors.request.use(attachTokenAndTenantID, Promise.reject);
axiosInstance.interceptors.response.use((res) => res, handleError);

export { axiosInstance };
