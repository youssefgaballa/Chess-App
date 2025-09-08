import { Link } from "react-router-dom";


export const Notes = () => {


  return ( 
    <>
      <div className='text-center'> Edit Notes: <br/>
        <Link to="/Notes/Editor" className="hover:text-blue-500 ">Notes Editor</Link>
      </div>
      
    </>
   );
}

