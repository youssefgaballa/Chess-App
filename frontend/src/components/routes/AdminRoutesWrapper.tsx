import { useSelector } from "react-redux";
import { selectUser } from "../../users/userSlice";
import { Navigate, Outlet } from "react-router";

export const AdminRoutesWrapper = () => {
  const user = useSelector(selectUser);

  return ((user.role === 'admin') ?
    <Outlet />
    : <Navigate to="/Unauthorized" replace />
  )
};
