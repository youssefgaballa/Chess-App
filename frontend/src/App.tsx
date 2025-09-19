import './App.css'
import Editor from './components/editor/Editor';
import { Home } from './components/Home';
import { LoginUser } from './components/LoginUser';
import NavBar from './components/Navbar';
import { Notes } from './components/Notes';
import { NotFound } from './components/NotFound';
import { RegisterUser } from './components/RegisterUser';
import { Routes, Route } from "react-router";
import { Map } from './components/Map';
import { usePersistLogin } from './util/persistLogin';
import Profile from './components/Profile';


function App() {
  //TODO:
  //Map app:
  // admins can undo stuff (have stack for the server state)
  // have rockets that can be controlled and store position, velocity, etc. in the backend
  
  // TODO: add conditional route to "/Notes/Editor/:title" after
  // users schema allows owning notes
  //TODO: show message that route is blocked if not authorized.
  // Note that this conditional routing can be overridden by refreshing the page (which clears the context state)

  usePersistLogin();


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route path="/" element={<Home />} />

        <Route path="/Notes" element={<Notes />} />
        <Route path="/Notes/Editor/:title"
          element={<Editor />} />
        <Route path="/Notes/Editor"
          element={<Editor />} />
        <Route path="/Registration"
          element={<RegisterUser />} />
        <Route path="/Login"
          element={<LoginUser />} />
        <Route path="/Map"
          element={<Map />} />
        <Route path='/Profile'
          element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
