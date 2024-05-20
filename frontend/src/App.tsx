import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./App.css"
import { LandingPage } from "./pages/landing-page"
import Home from "./pages/home"
import { Dashboard } from "./pages/dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"
import { Cart } from "./pages/cart"
import { ProdcutDetails } from "./pages/porductDetails"
import { ProductsPage } from "./pages/products-page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/products/:productId",
    element: <ProdcutDetails />
  },
  {
    path: "/products",
    element: <ProductsPage />
  }
])
type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}
type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return

    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleDeleteFromCart = (id: string) => {
    const filteredCart = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: filteredCart
    })
  }
  return (
    <div>
      <GlobalContext.Provider value={{ state, handleAddToCart, handleDeleteFromCart }}>
        <RouterProvider router={router} />{" "}
      </GlobalContext.Provider>
    </div>
  )
}

export default App
