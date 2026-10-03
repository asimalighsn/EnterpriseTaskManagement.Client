import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { ProtectedRoute } from './auth/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import './App.css'

function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
        <Routes>
        <Route path= "/login" element = {< Login />} />
            < Route path = "/register" element = {< Register />} />

                < Route
path = "/dashboard"
element = {
              < ProtectedRoute >
    <Dashboard />
    </ProtectedRoute>
            }
          />

    < Route
path = "/projects"
element = {
              < ProtectedRoute >
    <Projects />
    </ProtectedRoute>
            }
          />

    < Route path = "/" element = {< Navigate to = "/dashboard" replace />} />
        < Route path = "*" element = {< Navigate to = "/dashboard" replace />} />
            </Routes>
            </BrowserRouter>
            </AuthProvider>
  )
}

export default App