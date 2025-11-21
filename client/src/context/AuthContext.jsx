import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

// Configure axios to use backend API
// Change 192.168.18.1 to your machine's IP address if needed
axios.defaults.baseURL = 'https://cms-final-version.onrender.com'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }

    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      // console.log(credentials.username+" "+credentials.password)
      const response = await axios.post('/api/auth/login', credentials)

      if (response.data.success) {
        const { token, user } = response.data.data

        setToken(token)
        setUser(user)

        // Persist to localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        // Set default Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return { success: true }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
