//import { useState } from 'react'
import './App.css'
import { Home } from './components/Home';
import NavBar from './components/Navbar';
import Notes from './components/Notes';
import { SampleComponent } from './components/SampleComponent'
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/Notes" element = {<Notes/>}/>
      <Route path = "/SampleComponent" element = {<SampleComponent/>}/>
    </Routes> 
    </>
  )
}

export default App
