import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddCriminal from './pages/AddCriminal'
import CriminalDetails from './pages/CriminalDetails'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-criminal"
            element={
              <ProtectedRoute>
                <AddCriminal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/criminal/:id"
            element={
              <ProtectedRoute>
                <CriminalDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
