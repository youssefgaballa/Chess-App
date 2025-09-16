import './App.css'
import Editor from './components/editor/Editor';
import { Home } from './components/Home';
import { LoginUser } from './components/LoginUser';
import NavBar from './components/Navbar';
import { Notes } from './components/Notes';
import { NotFound } from './components/NotFound';
import { RegisterUser } from './components/RegisterUser';
import { Routes, Route, Navigate } from "react-router";
import useAuth from './state/AuthorizationContext';
import Unauthorized from './components/Unauthorized';


function App() {
  const { userAuth, setUserAuth } = useAuth();
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
          element={userAuth.username ? <Unauthorized /> : <RegisterUser />} />
        <Route path="/Login"
          element={userAuth.username ? <Unauthorized /> : <LoginUser />} />
      </Routes>
    </>
  )
}

export default App
