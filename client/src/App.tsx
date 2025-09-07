import './App.css'
import { Home } from './components/Home';
import NavBar from './components/Navbar';
import { SampleComponent } from './components/SampleComponent';
import { Routes, Route } from "react-router-dom";


function App() {
  //<Route path = "/NotesDepr" element = {<NotesDepr/>}/>
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/SampleComponent" element={<SampleComponent />} />
      </Routes>
    </>
  )
}

export default App
