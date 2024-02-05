import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import AppShell from "./pages/AppShell"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
