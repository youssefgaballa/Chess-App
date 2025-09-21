import { createPortal } from "react-dom"
import type { currentUserType } from "./Admin"

export const EditUser = ({ setShowModal, selectedUser }
  : { setShowModal: (show: boolean) => void, selectedUser: currentUserType | null  }) => {

  return createPortal(
    <>
      <div className='bg-gray-500 opacity-50 fixed inset-0 z-2'>
      </div>
      <div className="fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  
              p-4 border border-black shadow-lg z-3 rounded-lg">
        Hello from React!
        <button onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          X
        </button>
      </div>
    </>,
    document.getElementById('modal-root') as HTMLElement
  )
}