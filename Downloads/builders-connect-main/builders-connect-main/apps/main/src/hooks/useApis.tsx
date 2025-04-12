import { axiosInstance, baseUrl } from '../utils/axios-instance';
import { useQuery, useMutation } from '@tanstack/react-query';

// Create Data
export const useCreateData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.post(baseUrl + url, arg);
      return response.data;
    },
  });

  return mutation;
};

export const useCreateExportData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.post(baseUrl + url, arg, {
        responseType: 'blob',
      });
      return response.data;
    },
  });

  return mutation;
};

// Get Export Data
export const useGetExportData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + url, {
        responseType: 'blob',
      });
      return response.data;
    },
  });

  return mutation;
};

// Upload Data
export const useUploadData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.post(baseUrl + url, arg, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });

  return mutation;
};

// Logout
export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + 'api/v1/auth/logout');
      return response.data;
    },
  });

  return mutation;
};

// Update (PUT) Data
export const usePutData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.put(baseUrl + url, arg);
      return response.data;
    },
  });

  return mutation;
};

// Delete Data
export const useDeleteData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(baseUrl + url);
      return response.data;
    },
  });

  return mutation;
};

// Get Data (Single Fetch)
export const useGetData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + url);
      return response.data;
    },
  });

  return mutation;
};

// Fetch Data (GET with Query)
export const useFetchData = (url: string) => {
  const query = useQuery({
    queryKey: ['fetchData', url],
    queryFn: async () => {
      if (!url) return null;
      const response = await axiosInstance.get(baseUrl + url);
      return response.data;
    },
    enabled: !!url,
  });

  return { ...query, isLoading: query.isFetching || query.isLoading };
};

// Fetch Post Data (POST with Query)
export const useFetchPostData = (url: string, options: any) => {
  const query = useQuery({
    queryKey: [url, options],
    queryFn: async () => {
      const response = await axiosInstance.post(baseUrl + url, options);
      return response.data;
    },
  });

  return { ...query, isLoading: query.isFetching || query.isLoading };
};
