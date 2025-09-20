import { useSelector } from "react-redux";
import { selectUser } from "../../users/userSlice";
import { Navigate, Outlet } from "react-router";

export const EditorRoutesWrapper = () => {
  const user = useSelector(selectUser);

  return ((user.role === 'editor' || user.role === 'admin') ? 
    <Outlet/> 
    : <Navigate to="/Unauthorized" replace />
  )
};
