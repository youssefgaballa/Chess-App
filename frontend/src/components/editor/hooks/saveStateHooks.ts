import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { customAxios } from "../../../util/customAxios";



export const usePublishMutation = (title: string) => {
    return useMutation({
      mutationFn: async (text: string) => {
        const { data } = await axios.post(`http://localhost:5000/data/${title}`, { text });
        return data;
      },
    });
};
  
export const useUpdateMutation = (title: string) => {
  return useMutation({
    mutationFn: async (text: string) => {
      const { data } = await axios.patch(`http://localhost:5000/data/${title}`, { text });
      return data;
    },
  });
};

export const useGetNotesQuery = ({title,enabled}:{title:string, enabled: boolean}) => {
    return useQuery({
      queryKey: ["get-data"],
      queryFn: async () => {
        const { data } = await axios.get(`http://localhost:5000/data/${title}`);
        return data;
      },
    });
};
  
export const useGetAllNotesQuery = (userAuth: { username: string, role: string, accessToken: string }) => {
  return useQuery({
    queryKey: ["get-all-data"],
    queryFn: async () => {
      try {
        const response = await customAxios.get(`http://localhost:5000/data`, { withCredentials: true });
        console.log(response.data);
        return response.data;
        
          
      } catch (error) {
        return error;
      }
    },
    staleTime: 1000 * 5, // 5 seconds
    retry: 10, // Retry up to 10 times on failure
    enabled: !!userAuth?.accessToken // Only run the query if accessToken is available


  });
};