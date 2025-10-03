import { useSelector } from "react-redux";
import { Link } from "react-router";
import { selectUser } from "../../users/userSlice";


export const ChessNav = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <div className='flex items-center justify-center mt-4'>
        <ul>
          <li><Link to='/Chess/solo'><div className="hover:bg-violet-600 border border-black rounded-md p-3">Play Solo</div></Link></li>
          {user.username !== null && <li><Link to='/Chess/duels'><div className="hover:bg-violet-600 border border-black rounded-md p-3">Play Duels</div></Link></li>}
        </ul>
      </div>
    </>
  )
};