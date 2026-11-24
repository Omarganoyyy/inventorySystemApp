import { Route, Routes } from "react-router-dom"
import { LoginPage } from "./modules/auth/LoginPage"
import { SignUpPage } from "./modules/auth/SignupPage"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  )
}

export default App