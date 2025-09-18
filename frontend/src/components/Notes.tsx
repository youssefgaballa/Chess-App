import { Link, useLocation } from "react-router";
import { useGetAllNotesQuery } from "./editor/hooks/saveStateHooks";
import  { useAuth } from "../state/AuthorizationContext";
import { axiosInterceptors } from "../util/axiosInterceptors";
import { usePersistLogin } from "../util/persistLogin";
//import Editor from "./editor/Editor";


export const Notes = () => {
  const location = useLocation();
  //const navigate = useNavigate();
  axiosInterceptors();
  const { userAuth } = useAuth();
  
  usePersistLogin();
  const { data } = useGetAllNotesQuery(userAuth);

  //console.log("data from useGetAllNotesQuery: ", data);

  return ( 
    <>
      
      
      <div className='text-center flex w-full h-full'>
        <div className='w-[20%]'>
          
        </div>
        <div className="w-[60%]">View Notes
          <ul>
            {data && data.map((note: { title: string; content: string }, index: number) => (
              
              <li key={index} className="border border-black m-2 p-2">

                  <strong>Title:</strong> {note.title}
                  <br />
                {userAuth.username &&
                  <Link to={`/Notes/Editor/${note.title.replaceAll(" ", '-')}`} state={{ from: location }} className='hover:text-blue-500'>Edit Note:</Link>
                }
                
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[20%] flex justify-around border-b border-black">
          <Link to="/Notes/Editor" state={{ from: location }} className="hover:text-blue-500 ">Create New Note</Link>
        </div>
      </div>
      
    </>
   );
}

