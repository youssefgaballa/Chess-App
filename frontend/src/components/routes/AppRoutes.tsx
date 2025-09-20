import { Route, Routes } from "react-router"
import { NotFound } from "../NotFound"
import { Home } from "../Home"
import Unauthorized from "../Unauthorized"
import { RegisterUser } from "../RegisterUser"
import { LoginUser } from "../LoginUser"
import { EditorRoutesWrapper } from "./EditorRoutesWrapper"
import { Notes } from "../Notes"
import Editor from "../editor/Editor"
import { MapRoutesWrapper } from "./MapRoutesWrapper"
import { Map } from "../Map"
import { ProfileRoutesWrapper } from "./ProfileRoutesWrapper"
import Profile from "../Profile"
import { AdminRoutesWrapper } from "./AdminRoutesWrapper"
import { Admin } from "../Admin"

export const AppRoutes = () => {

  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path='/Unauthorized' element={<Unauthorized />} />
        <Route path="/Registration"
          element={<RegisterUser />} />
        <Route path="/Login"
          element={<LoginUser />} />

        <Route element={<EditorRoutesWrapper />}>
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Notes/Editor/:title"
            element={<Editor />} />
          <Route path="/Notes/Editor"
            element={<Editor />} />
        </Route>
        <Route element={<MapRoutesWrapper />}>
          <Route path="/Map"
            element={<Map />} />
        </Route>
        <Route element={<ProfileRoutesWrapper />}>
          <Route path='/Profile'
            element={<Profile />} />
        </Route>
        <Route element={<AdminRoutesWrapper />}>
          <Route path='/Admin'
            element={<Admin />} />
        </Route>
      </Routes>
    </>
  )
}