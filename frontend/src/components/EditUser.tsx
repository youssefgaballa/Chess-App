import { createPortal } from "react-dom"
import type { currentUserType } from "./Admin"
import { useState } from "react";
import { UserForm } from "./UserForm";
import { customAxios } from "../util/customAxios";
import type { UserData } from "./RegisterUser";
import { axiosInterceptors } from "../util/axiosInterceptors";
import { useQueryClient } from "@tanstack/react-query";

export const EditUser = ({ setShowModal, selectedUser }
  : { setShowModal: (show: boolean) => void, selectedUser: currentUserType | null }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  //const currentUser = useSelector(selectUser);
  axiosInterceptors();
  console.log("EditUser selectedUser: ", selectedUser);
  const queryClient = useQueryClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>,
    userData: UserData): Promise<void> => {
    console.log("----handleSubmit()");
    event.preventDefault();
    console.log("selectedUser.username in handleSubmit: ", selectedUser?.username);
    const reqBody = userData;
    // console.log(reqBody);
    await customAxios.patch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/users/${selectedUser?.username}`,
      reqBody, { withCredentials: true }).catch((error) => {
      console.log(error);
      if (!error?.response) {
        setErrorMessage("No response from server");
      } else if (error.response?.status === 400) {
        setErrorMessage(error.response.data['Client Error']);
      } else {
        setErrorMessage("User Update Failed");
      }
      return;
    }).then((response) => {
      console.log("handlerSubmit response: ", response);
      if (!errorMessage && response?.status === 200) {
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["get-all-users"] });

      }
    }).catch((error) => {
      console.log(error);
    });
  // const newUser = response?.data;
  // console.log("newUser: ", newUser);
  };
  return createPortal(
    <>
      <div className='bg-gray-500 opacity-50 fixed inset-0 z-2'>
      </div>
      <div className="fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  
              p-4 border border-black shadow-lg z-3 rounded-lg">
        <UserForm handleSubmit={handleSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} type='edit' />
        <button onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          X
        </button>
      </div>
    </>,
    document.getElementById('modal-root') as HTMLElement
  )
}