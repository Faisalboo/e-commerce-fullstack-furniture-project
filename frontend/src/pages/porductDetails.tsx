import { GlobalContext } from "@/App"
import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Footer } from "@/components/ui/footer"
import { NavBar } from "@/components/ui/navBar"
import { Skeleton } from "@/components/ui/skeleton"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link, useParams } from "react-router-dom"

export function ProdcutDetails() {
  const context = useContext(GlobalContext)

  if (!context) throw Error("Context not found")
  const { state, handleAddToCart, handleDeleteFromCart } = context
  const params = useParams()

  // API
  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const {
    data: product,
    error,
    isLoading
  } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })
  if (!product) {
    return <p>Product not found</p>
  }
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }
  return (
    <div>
      <NavBar />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              alt="Product Image"
              className="w-full h-auto rounded-md object-cover"
              height={600}
              src={product.image || "/placeholder.svg"}
              style={{
                aspectRatio: "600/600",
                objectFit: "cover"
              }}
              width={600}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-6">{product.categoryId}</p>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs">SR</span>
                <span className="text-3xl font-bold">{product.price}</span>
              </div>
              <Button size="lg" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p>{product.description}</p>
              </div>
              {/* <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Wireless Bluetooth connectivity</li>
                  <li>Active noise cancellation</li>
                  <li>Up to 20 hours of battery life</li>
                  <li>Comfortable and adjustable design</li>
                  <li>Integrated microphone for calls</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Bluetooth 5.0 connectivity</li>
                  <li>Frequency response: 20Hz - 20kHz</li>
                  <li>Impedance: 32 ohms</li>
                  <li>Sensitivity: 98dB</li>
                  <li>Weight: 250g</li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
