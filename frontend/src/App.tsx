import { Route, Routes } from 'react-router-dom'
import GuestLayout from './layouts/GuestLayout'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import AppLayout from './layouts/AppLayout'
import DashboardAdmin from './pages/DashboardAdmin'

function App() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
