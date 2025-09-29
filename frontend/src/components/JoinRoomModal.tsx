import { useState } from "react";
import { createPortal } from "react-dom"



export const JoinRoomModal = ({ setShowModal, onJoinRoom, errorMessage, setErrorMessage }: {
  setShowModal: (show: boolean) => void,
  onJoinRoom: (roomID: number, setErrorMessage: (msg: string) => void) => void,
  errorMessage: string,
  setErrorMessage: (msg: string) => void
}) => {
  //const [username, setUsername] = useState<string>("");
  const [roomID, setRoomID] = useState<number | null>(null);
  
  return createPortal(
    <>
      <div className='bg-gray-500 opacity-50 fixed inset-0 z-2'>
      </div>
      <div className="fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  
                p-4 border border-black shadow-lg z-3 rounded-lg">
        <input type="text" placeholder="Enter Room ID"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
          onChange={(e) => setRoomID(Number(e.target.value))} />
        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
          onClick={() => onJoinRoom(roomID as number, setErrorMessage)}>
          Join Room
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <button onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          X
        </button>
      </div>
    </>,
    document.getElementById('modal-root') as HTMLElement
  )
}