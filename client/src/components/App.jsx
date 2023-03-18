import AppRouter from '../AppRouter.jsx'
import { AuthProvider, StorageTypes } from '../hooks/useAuth.jsx'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <AuthProvider storageType={StorageTypes.LOCAL_STORAGE}>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}
