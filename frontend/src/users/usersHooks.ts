// import { useQuery } from "@tanstack/react-query";
// import { customAxios } from "../util/customAxios";

//add GETALL USERS

// export const useGetUserQuery = (userAuth: { username: string, role: string, accessToken: string }) => {
//   return useQuery({
//     queryKey: ["get-user"],
//     queryFn: async () => {
//       console.log("--useGetUserQuery--");
//       console.log("userAuth in useGetUserQuery: ", userAuth);
//       const { data } = await customAxios.get(`http://localhost:5000/users/${userAuth.username}`, {
//         withCredentials: true
//       });
//       return data;
//     },
//     enabled: !!userAuth?.accessToken, // Only run the query if accessToken is available
//   });
// }
