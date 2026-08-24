import './App.css'
import AppRouter from './components/AppRouter'
import AuthProvider from './context/AuthProvider'

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App
