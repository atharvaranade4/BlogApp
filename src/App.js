import { Routes, Route } from 'react-router-dom'

import TopBar from "./components/topBar/TopBar"
import Homepage from "./pages/homepage/Homepage"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Settings from "./pages/settings/Settings"
import Single from "./pages/single/Single"
import Write from "./pages/write/Write"
import { Context } from './context/Context'
import { useContext } from 'react'

export default function App() {
  const { user } = useContext(Context)

  return (
    <>
      <TopBar/>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/register" element={user ? <Homepage /> : <Register />} />
        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </>
  )
}
