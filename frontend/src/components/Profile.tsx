import { useEffect, useState } from "react";
import { useAuth } from "../users/userAuthContext";
import { usePersistLogin } from "../util/persistLogin";
import { useGetUserQuery } from "../users/usersHooks";

// use react redux
export default function Profile() {
  const { userAuth } = useAuth();

  usePersistLogin();
  const [userDetails, setUserDetails] = useState<{
    username: string, email: string,
    firstName: string, lastName: string, role: string
  }>({ username: "", email: "", firstName: "", lastName: "", role: "" });
  const { data, isLoading, isError, error } = useGetUserQuery(userAuth);
  console.log("data from useGetUserQuery: ", data);

  useEffect(() => {
    if (data) {
      setUserDetails({
        username: data.username, email: data.email,
        firstName: data.firstname, lastName: data.lastname, role: data.user_role
      });
    }
  }, [data]);

  return (
      <>
      <div className='flex w-full h-full '>
        <div className='w-[30vw] h-[100vh]'></div>
        <div className="text-center w-[40vw] h-[80vh] mt-[2%] pt-[5%] text-2xl rounded-xl shadow-lg border border-black overflow-auto">
          <h1>Username: {userDetails.username}</h1>
          <h1>Email: {userDetails.email}</h1>
          <h1>First Name: {userDetails.firstName}</h1>
          <h1>Last Name: {userDetails.lastName}</h1>
          <h1>Role: {userDetails.role}</h1>
        </div>
        <div className='w-[30vw] h-[100vh]'></div>
      </div>
        </>
  );
};