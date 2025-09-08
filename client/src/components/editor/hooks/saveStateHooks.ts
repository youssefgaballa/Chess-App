import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useDataMutation = () => {
    return useMutation({
      mutationFn: async (text: string) => {
        const { data } = await axios.post("http://localhost:5000/data", { text });
        return data;
      },
    });
};
  
export const useDataQuery = () => {
    return useQuery({
      queryKey: ["get-data"],
      queryFn: async () => {
        const { data } = await axios.get("http://localhost:5000/data");
        return data;
      },
    });
  };