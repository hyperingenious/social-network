import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppShell
  from "./pages/layouts/AppShell"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import PeopleToFollow from "./pages/PeopleToFollow"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<Search />} />
          <Route path="peopleToFollow" element={<PeopleToFollow />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
