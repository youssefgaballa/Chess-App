import { useSelector } from "react-redux";
import { selectUser } from "../../users/userSlice";
import { Navigate, Outlet } from "react-router";

export const ProfileRoutesWrapper = () => {
  const user = useSelector(selectUser);

  return ((user.role) ?
    <Outlet />
    : <Navigate to="/Unauthorized" replace />
  )
};
