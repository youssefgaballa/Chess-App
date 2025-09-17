import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthContext, { useAuth } from "../../../state/AuthorizationContext";
import { useContext } from "react";



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
  
export const useGetAllNotesQuery = (accessToken: string) => {
    return useQuery({
      queryKey: ["get-all-data"],
      queryFn: async () => {
        console.log("useGetAllNotesQuery called");
        
        const reqBody = { access_token: accessToken };
        console.log("reqBody: ", reqBody);
        const response = await axios.get(`http://localhost:5000/data`, { params: reqBody, withCredentials: true }).catch((error) => {
          console.log(error.response.data);
          //QueryClient.invalidateQueries({ queryKey: ["get-all-data"] });
          return;
        
        });
        return response?.data;
      },
      staleTime: Infinity
    });
};