import { Route, Routes } from 'react-router-dom'
import GuestLayout from './layouts/GuestLayout'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import AppLayout from './layouts/AppLayout'
import DashboardAdmin from './pages/AdminDashboard'
import UserManagement from './pages/UserManagement'

function App() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/admin-dashboard" element={<DashboardAdmin />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
