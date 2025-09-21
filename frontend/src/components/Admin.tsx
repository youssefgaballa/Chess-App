import { useSelector } from "react-redux";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../users/usersHooks";
import { selectUser } from "../users/userSlice";
import { axiosInterceptors } from "../util/axiosInterceptors";
import {  useQueryClient } from "@tanstack/react-query";
import {  useEffect, useState } from "react";
import { useGetUserNotesQuery } from "./editor/hooks/notesHooks";

//TODO: add modal to update user.
//TODO: add infinite scroll to user list.
export const Admin = () => {
  const user = useSelector(selectUser);
  axiosInterceptors();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { data } = useGetAllUsersQuery(user.accessToken);
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

  const { data: notesData } = useGetUserNotesQuery(selectedUser, user.accessToken);

  console.log("notesData: ", notesData);
  // const createModal = () => {
  //   const modalRoot = document.getElementById('modal-root');
  //   if (modalRoot) {
  //     const modalElement = document.createElement('div');
  //   }
  // }
  useEffect(() => {
    setSelectedUser(null);
  }, [data, notesData]);

  const deleteHandler = (username: string) => {
    console.log("delete user with username: ", username);
    if (username === user.username) {
      alert("You cannot delete yourself!");
      return;
    }
    deleteUser(username);
    queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
    
  }

  const setOnClick = (index: number, username: string) => {
    setSelectedUserIndex(index);
    setSelectedUser(username);
    if (index !== selectedUserIndex) {
      queryClient.invalidateQueries({ queryKey: ["get-user-notes"] });
    }
    console.log("selectedUserIndex: ", selectedUserIndex);
    console.log("index: ", index);
  }

    return (

      <div className='flex w-full h-auto '>
        <div className='w-[20vw] h-[100vh]'></div>
        <div className='flex flex-col  text-center mt-[2%] mr-[2%] w-[30vw] h-full '>
          {
            data?.map((currentUser: {user_id: number,
              username: string, email: string, firstname: string,
              lastname: string, user_role: string
            }, index: number) => (
              <div key={index} onClick={() => setOnClick(index, currentUser.username)}
                className={selectedUserIndex == index ? 'flex flex-col items-center text-center w-[30vw] h-auto  p-[5%] mb-[3%] text-2xl rounded-xl shadow-lg border border-green-500 overflow-auto'
                  : 'flex flex-col items-center text-center w-[30vw] h-auto  p-[5%] mb-[3%] text-2xl rounded-xl shadow-lg border border-black overflow-auto'}>
                <h1>User ID: {currentUser.user_id}</h1>
                <h1>Username: {currentUser.username}</h1>
                <h1>Email: {currentUser.email}</h1>
                <h1>First Name: {currentUser.firstname}</h1>
                <h1>Last Name: {currentUser.lastname}</h1>
                <h1>Role: {currentUser.user_role}</h1>
                <button onClick={() => deleteHandler(currentUser.username)}
                  className="m-[3%] p-[1%] w-[50%] border border-black rounded-lg hover:bg-red-500 hover:text-white">{isDeleting ? 'Deleting...' : 'Delete User'}</button>
                <button className=" w-[50%] border border-black rounded-lg hover:bg-blue-500 hover:text-white">Update User</button>
              </div>
            ))
          }

        </div>
          
        <div className='flex flex-col  text-center mt-[2%] mr-[2%] w-[30vw] h-full '>
          {notesData && notesData.map((note: { title: string; content: string }, index: number) => (
            <div key={index} className="border border-black m-2 p-2">
              <strong>Title:</strong> {note.title}
              <br />
              <strong>Content:</strong> {note.content}
            </div>
          ))}
        </div>

          <div className='w-[20vw] h-[100vh]'></div>
        
        </div>
    );
} 