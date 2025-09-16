import './App.css'
import Editor from './components/editor/Editor';
import { Home } from './components/Home';
import { LoginUser } from './components/LoginUser';
import NavBar from './components/Navbar';
import { Notes } from './components/Notes';
import { NotFound } from './components/NotFound';
import { RegisterUser } from './components/RegisterUser';
import { Routes, Route } from "react-router";
import Unauthorized from './components/Unauthorized';
import { Map } from './components/Map';
import { useContext } from 'react';
import AuthContext  from './state/AuthorizationContext';


function App() {
  //TODO:
  //Map app:
  // admins can undo stuff (have stack for the server state)
  // have rockets that can be controlled and store position, velocity, etc. in the backend
    const userAuth = useContext(AuthContext)?.userAuth!;
  
  // TODO: add conditional route to "/Notes/Editor/:title" after
  // users schema allows owning notes
  //TODO: show message that route is blocked if not authorized.
  // Note that this conditional routing can be overridden by refreshing the page (which clears the context state)
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Notes/Editor/:title"
          element={(userAuth.role === "editor") || (userAuth.role === "admin") ? <Editor /> : <Unauthorized />} />
        <Route path="/Notes/Editor"
          element={(userAuth.role === "editor") || (userAuth.role === "admin") ? <Editor /> : <Unauthorized />} />
        <Route path="/Registration"
          element={userAuth.username ? <Home /> : <RegisterUser />} />
        <Route path="/Login"
          element={userAuth.username ? <Home /> : <LoginUser />} />
        <Route path="/Map"
          element={(userAuth.role === "gamer") || (userAuth.role === "admin") ? <Map /> : <Unauthorized />} />
      </Routes>
    </>
  )
}

export default App
