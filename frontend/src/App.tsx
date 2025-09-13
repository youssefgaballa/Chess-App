import './App.css'
import Editor from './components/editor/Editor';
import { Home } from './components/Home';
import NavBar from './components/Navbar';
import { Notes } from './components/Notes';
import { SampleComponent } from './components/SampleComponent';
import { Routes, Route } from "react-router-dom";


function App() {
  //<Route path = "/NotesDepr" element = {<NotesDepr/>}/>

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Notes/Editor/:title" element={<Editor />} />
        <Route path="/Notes/Editor" element={<Editor />} />
        <Route path="/SampleComponent" element={<SampleComponent />} />
      </Routes>
    </>
  )
}

export default App
