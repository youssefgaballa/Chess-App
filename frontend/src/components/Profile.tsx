import { useAuth } from "../users/userAuthContext";
import { usePersistLogin } from "../util/persistLogin";

// use react redux
export default function Profile() {
  const { userAuth, setUserAuth } = useAuth();
  const username = userAuth.username;
  const role = userAuth.role;
  //console.log("Profile component rendered, userAuth: ", userAuth);
  usePersistLogin();
  return (
      <>
      <div className='flex w-full h-full '>
        <div className='w-[30vw] h-[100vh]'></div>
        <div className="text-center w-[40vw] h-[80vh] mt-[2%] pt-[5%] text-2xl rounded-xl shadow-lg border border-black overflow-auto">
          <h1>Username: {username}</h1>
          <p>Role: {role}</p>
        </div>
        <div className='w-[30vw] h-[100vh]'></div>
      </div>
        </>
  );
};