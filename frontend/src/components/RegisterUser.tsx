import { useNavigate } from "react-router";
import { customAxios } from "../util/customAxios";
import { useState } from "react";
import { UserForm } from "./UserForm";
import { axiosInterceptors } from "../util/axiosInterceptors";

export type UserData = {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  role: string
};

export const RegisterUser = () => {
  axiosInterceptors();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>,
    userData: UserData): Promise<void> => {
    console.log("handleSubmit()");
    event.preventDefault();

    const reqBody = userData;
    console.log(reqBody);
    const response = await customAxios.post(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/registration`, reqBody).catch((error) => {
      console.log(error);
      if (!error?.response) {
        setErrorMessage("No response from server");
      } else if (error.response?.status === 400) {
        setErrorMessage(error.response.data['Client Error']);
      } else {
        setErrorMessage("Registration Failed");
      }
      return;
    });
    console.log(response);
    if (!errorMessage && response?.status === 200) {
      //console.log("successful registration");
      navigate('/login', { replace: true });
    }
  };
  return (

    <div className='flex w-full h-full '>
      <div className='w-[30vw] h-full'></div>
      <div className="text-center w-[40vw] h-[80vh] mt-[2%] pt-[5%] text-2xl rounded-xl shadow-lg border border-black overflow-auto">
        <UserForm handleSubmit={handleSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} type='register' />
        
      </div >
      <div className='w-[30vw] h-full'></div>
    </div>



  )

}