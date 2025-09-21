import { useMutation, useQuery } from "@tanstack/react-query";
import { customAxios } from "../../../util/customAxios";


export const usePublishMutation = (title: string, accessToken: string | null) => {
    return useMutation({
      mutationFn: async (text: string) => {
        // console.log("--usePublishMutation--");
        // console.log("userAuth in usePublishMutation: ", userAuth);
        // console.log("title in usePublishMutation: ", title);
        // console.log("text in usePublishMutation: ", text);
        const { data } = await customAxios.post(`http://localhost:5000/data/${title}`, { text }, {
          headers: {
            authorization: `bearer ${accessToken}`
          }
        });
        return data;
      },
    });
};

export const useUpdateMutation = (title: string, accessToken: string | null) => {
  return useMutation({
    mutationFn: async (text: string) => {
      //console.log("--useUpdateMutation--");
      const { data } = await customAxios.patch(`http://localhost:5000/data/${title}`, { text }, {
        headers: {
          authorization: `bearer ${accessToken}`
        }
      });
      return data;
    },

  });
};

export const useGetNotesQuery = (published: boolean, title: string, accessToken: string | null) => {
    return useQuery({
      queryKey: ["get-data"],
      queryFn: async () => {
        // console.log("--useGetNotesQuery--");
        // console.log("userAuth in useGetNotesQuery: ", userAuth);
        const { data } = await customAxios.get(`http://localhost:5000/data/${title}`, {withCredentials: true});
        return data;
      },
      enabled: !!accessToken && published, // Only run the query if accessToken is available and title is not empty
      staleTime: 0, // 0 milliseconds
      retry: 10 // Retry up to 10 times on failure
    });
};

export const useGetUserNotesQuery = (username: string | null | undefined, accessToken: string | null ) => {
  return useQuery({
    queryKey: ["get-user-notes"],
    queryFn: async () => {
      // console.log("--useGetUserNotesQuery--");
      const response = await customAxios.get(`http://localhost:5000/data/user/${username}`, { withCredentials: true });
      // console.log("data from useGetUserNotesQuery: ", response.data);
      return response.data;
    },
    enabled: !!accessToken && !!username, // Only run the query if accessToken is available and username is not empty
    staleTime: 0, // 0 milliseconds
    retry: 10 // Retry up to 10 times on failure
  });
};

export const useGetAllNotesQuery = (accessToken: string | null ) => {
  return useQuery({
    queryKey: ["get-all-data"],
    queryFn: async () => {
      try {
        const response = await customAxios.get(`http://localhost:5000/data`, { withCredentials: true });
        //console.log(response.data);
        return response.data;
        
          
      } catch (error) {
        return error;
      }
    },
    staleTime: 1000 * 5, // 5 seconds
    retry: 10, // Retry up to 10 times on failure
    enabled: !!accessToken // Only run the query if accessToken is available


  });
};