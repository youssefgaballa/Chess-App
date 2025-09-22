import { useMutation, useQuery } from "@tanstack/react-query";
import { customAxios } from "../util/customAxios";

//add GETALL USERS

export const useGetAllUsersQuery = (accessToken: string | null) => {
  return useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => {
      console.log("--useGetAllUsersQuery--");
      const { data } = await customAxios.get("http://localhost:5000/users", {
        withCredentials: true
      });
      console.log("data from useGetAllUsersQuery: ", data);
      return data;
    },
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
};

export const useDeleteUserMutation = ( ) => {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (username: string) => {
      console.log("--useDeleteUserMutation--");
      const { data } = await customAxios.delete(`http://localhost:5000/users/${username}`, {
        withCredentials: true
      });
      return data;
    },
  });
};

export const useGetUserQuery = (username: string, accessToken: string) => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      console.log("--useGetUserQuery--");
      console.log("userAuth in useGetUserQuery: ", username);
      const { data } = await customAxios.get(`http://localhost:5000/users/${username}`, {
        withCredentials: true
      });
      return data;
    },
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
}

