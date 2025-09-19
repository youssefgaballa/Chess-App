import { usePersistLogin } from "../util/persistLogin";
import { useSelector } from "react-redux";
import { selectUser } from "../users/userSlice";

// use react redux
export default function Profile() {
  usePersistLogin();
  const user = useSelector(selectUser);
  //console.log("user from redux store: ", user);

  return (
      <>
      <div className='flex w-full h-full '>
        <div className='w-[30vw] h-[100vh]'></div>
        <div className="text-center w-[40vw] h-[80vh] mt-[2%] pt-[5%] text-2xl rounded-xl shadow-lg border border-black overflow-auto">
          <h1>Username: {user.username}</h1>
          <h1>Email: {user.email}</h1>
          <h1>First Name: {user.firstname}</h1>
          <h1>Last Name: {user.lastname}</h1>
          <h1>Role: {user.role}</h1>
        </div>
        <div className='w-[30vw] h-[100vh]'></div>
      </div>
        </>
  );
};