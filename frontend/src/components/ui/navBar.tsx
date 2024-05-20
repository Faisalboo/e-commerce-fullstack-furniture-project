import { Link } from "react-router-dom"
import { MenuIcon, PackageIcon, SearchIcon, ShoppingCartIcon } from "lucide-react"
import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "./drawer"
import { Button } from "./button"
import { GlobalContext } from "@/App"
import api from "@/api"

import { Product } from "@/types"

export function NavBar() {
  const context = useContext(GlobalContext)

  if (!context) throw Error("Context not found")
  const { state, handleAddToCart, handleDeleteFromCart } = context
  console.log("context:", state)

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link className="flex items-center gap-2" to="/">
        <PackageIcon className="h-6 w-6" />
        <span className="font-semibold">Omair Store</span>
      </Link>
      <nav className="hidden space-x-4 md:flex">
        <Link className="hover:underline" to="/products">
          Shop
        </Link>
        <Link className="hover:underline" to="#">
          About
        </Link>
        <Link className="hover:underline" to="#">
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link className="hover:underline" to="#">
          <SearchIcon className="h-5 w-5" />
        </Link>
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="w-full bg-gray-800 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Search products..."
            type="search"
          />
        </div>
        <Drawer>
          <DrawerTrigger>
            <span className="text-xs">{state.cart.length}</span>
            <ShoppingCartIcon className="h-5 w-5" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Cart</DrawerTitle>
              {state.cart?.map((product) => (
                <div key={product.id} className="flex justify-between mt-2">
                  <img height={100} width={100} src={product.image || "/placeholder.svg"} />

                  <h3>{product.name}</h3>
                  <div>
                    <span className="text-xs">SR</span>
                    <span>{product.price}</span>
                  </div>
                  <Button variant="destructive" onClick={() => handleDeleteFromCart(product.id)}>
                    X
                  </Button>
                </div>
              ))}
              <DrawerDescription>You can checkout or view full cart.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className="flex justify gap-6">
                <Button variant="link">Go to Checkout</Button>
                <Link className="hover:underline" to="/cart">
                  <Button variant="link">Go to Cart</Button>
                </Link>
                <DrawerClose>
                  <Button variant="link">Close</Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button className="rounded-full" size="icon" variant="ghost">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}
