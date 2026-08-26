import './App.css'
import AppRouter from './components/AppRouter'
import AuthProvider from './context/AuthProvider'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


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
