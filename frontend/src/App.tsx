import './App.css'
import Editor from './components/editor/Editor';
import { Home } from './components/Home';
import { LoginUser } from './components/LoginUser';
import NavBar from './components/Navbar';
import { Notes } from './components/Notes';
import { NotFound } from './components/NotFound';
import { RegisterUser } from './components/RegisterUser';
import { Routes, Route } from "react-router";


function App() {
  //<Route path = "/NotesDepr" element = {<NotesDepr/>}/>

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Notes/Editor/:title" element={<Editor />} />
        <Route path="/Notes/Editor" element={<Editor />} />
        <Route path="/Registration" element={<RegisterUser />} />
        <Route path="/Login" element={<LoginUser />} />
      </Routes>
    </>
  )
}

export default App
