import { useEffect } from 'react';
import './App.css'
import NavBar from './components/Navbar';
import { AppRoutes } from './components/routes/AppRoutes';
import { usePersistLogin } from './util/persistLogin';
import { useLocation } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from './util/socketManager';


function App() {
  //TODO:
  //Map app:
  // admins can undo stuff (have stack for the server state)
  // have rockets that can be controlled and store position, velocity, etc. in the backend
  
  // TODO: add conditional route to "/Notes/Editor/:title" after
  // users schema allows owning notes
  //TODO: show message that route is blocked if not authorized.
  // Note that this conditional routing can be overridden by refreshing the page (which clears the context state)
  //console.log("App component mounted");
  const location = useLocation();
  const queryClient = useQueryClient();

  usePersistLogin();
  useEffect(() => {
    console.log("location path changed: ", location.pathname);
    queryClient.invalidateQueries({ queryKey: ["get-user-notes"] }).then(() => {
      console.log("invalidated get-user-notes query");
    });
  }, [location.pathname]);

  useSocket();

  // TODO: protect routes based on role
  // since users can just type in the url and go to a protected route
  // even without the link being visible, we need to protect the route itself.
  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  )
}

export default App
