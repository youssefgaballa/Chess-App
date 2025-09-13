import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";


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
  
export const useGetAllNotesQuery = () => {
    return useQuery({
      queryKey: ["get-all-data"],
      queryFn: async () => {
        const { data } = await axios.get(`http://localhost:5000/data`);
        return data;
      },
    });
};