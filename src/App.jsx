import { LandingPage } from './pages/LandingPage'
import { CartProvider } from './context/CartContext'

export default function App() {
  return <CartProvider><LandingPage /></CartProvider>
}
