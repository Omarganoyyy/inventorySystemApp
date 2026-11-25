import { Route, Routes } from "react-router-dom"
import { LoginPage } from "./modules/auth/LoginPage"
import { SignUpPage } from "./modules/auth/SignupPage"
import { ProfilePage } from "./modules/auth/ProfilePage"
import { DashboardPage } from "./modules/dashboard/DashboardPage"
import { ProductsPage } from "./modules/products/ProductsPage"
import { ProductFormPage } from "./modules/products/ProductFormPage"
import { ProductDetailsPage } from "./modules/products/ProductDetailsPage"
import { StockMovementsPage } from "./modules/movements/StockMovementsPage"
import { PendingUsersPage } from "./modules/approval/PendingUsersPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/new" element={<ProductFormPage mode="create" />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route path="/products/:productId/edit" element={<ProductFormPage mode="edit" />} />
      <Route path="/stock-movements" element={<StockMovementsPage />} />
      <Route path="/pending-users" element={<PendingUsersPage />} />
    </Routes>
  )
}

export default App