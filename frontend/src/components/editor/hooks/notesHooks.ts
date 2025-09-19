import { useMutation, useQuery } from "@tanstack/react-query";
import { customAxios } from "../../../util/customAxios";



export const usePublishMutation = (title: string,
  userAuth: { username: string, role: string, accessToken: string }) => {
    return useMutation({
      mutationFn: async (text: string) => {
        console.log("--usePublishMutation--");
        console.log("userAuth in usePublishMutation: ", userAuth);
        console.log("title in usePublishMutation: ", title);
        console.log("text in usePublishMutation: ", text);
        const { data } = await customAxios.post(`http://localhost:5000/data/${title}`, { text }, {
          headers: {
            authorization: `bearer ${userAuth.accessToken}`
          }
        });
        return data;
      },
    });
};
  
export const useUpdateMutation = (title: string,
  userAuth: { username: string, role: string, accessToken: string }) => {
  return useMutation({
    mutationFn: async (text: string) => {
      console.log("--useUpdateMutation--");
      const { data } = await customAxios.patch(`http://localhost:5000/data/${title}`, { text }, {
        headers: {
          authorization: `bearer ${userAuth.accessToken}`
        }
      });
      return data;
    },

  });
};

export const useGetNotesQuery = (published: boolean, title:string,userAuth: { username: string, role: string, accessToken: string }) => {
    return useQuery({
      queryKey: ["get-data"],
      queryFn: async () => {
        console.log("--useGetNotesQuery--");
        console.log("userAuth in useGetNotesQuery: ", userAuth);
        const { data } = await customAxios.get(`http://localhost:5000/data/${title}`, {withCredentials: true});
        return data;
      },
      enabled: !!userAuth?.accessToken && published, // Only run the query if accessToken is available and title is not empty
      staleTime: 0, // 0 milliseconds
      retry: 10 // Retry up to 10 times on failure
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