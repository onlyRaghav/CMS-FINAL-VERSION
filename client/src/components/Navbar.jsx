import { useAuth } from '../context/AuthContext'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Criminal Management System</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.fullName}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
