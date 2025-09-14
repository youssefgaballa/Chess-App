import './App.css'
import Editor from './components/editor/Editor';
import { Home } from './components/Home';
import NavBar from './components/Navbar';
import { Notes } from './components/Notes';
import { NotFound } from './components/NotFound';
import { RegisterUser } from './components/RegisterUser';
import { Routes, Route } from "react-router-dom";


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
      </Routes>
    </>
  )
}

export default App
