import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@/types"
import { NavBar } from "@/components/ui/navBar"
import { Footer } from "@/components/ui/footer"

export function ProductsPage() {
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
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-50 dark:bg-gray-950 dark:text-gray-50">
      <header className="border-b border-gray-800">
        <NavBar />
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-6">
        <div className="bg-gray-800 rounded-md p-4">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <nav className="grid gap-2">
            <Link className="text-sm font-medium hover:underline" to="#">
              Clothing
            </Link>
            <Link className="text-sm font-medium hover:underline" to="#">
              Electronics
            </Link>
            <Link className="text-sm font-medium hover:underline" to="#">
              Home & Garden
            </Link>
            <Link className="text-sm font-medium hover:underline" to="#">
              Beauty & Personal Care
            </Link>
            <Link className="text-sm font-medium hover:underline" to="#">
              Sports & Outdoors
            </Link>
          </nav>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <Accordion collapsible type="single">
              <AccordionItem value="price">
                <AccordionTrigger className="text-sm font-medium">Price</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="price-under-50" />
                      Under $50{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="price-50-100" />
                      $50 - $100{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="price-over-100" />
                      Over $100{"\n                                    "}
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="brand">
                <AccordionTrigger className="text-sm font-medium">Brand</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="brand-acme" />
                      Acme{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="brand-globex" />
                      Globex{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="brand-stark" />
                      Stark{"\n                                    "}
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="color">
                <AccordionTrigger className="text-sm font-medium">Color</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-2">
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="color-black" />
                      Black{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="color-white" />
                      White{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="color-red" />
                      Red{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="color-green" />
                      Green{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="color-blue" />
                      Blue{"\n                                    "}
                    </Label>
                    <Label className="flex items-center gap-2 text-sm">
                      <Checkbox id="color-yellow" />
                      Yellow{"\n                                    "}
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((product) => (
            <div key={product.id}>
              <div className="bg-gray-800 rounded-md overflow-hidden">
                <Link to={`/products/${product?.id}`}>
                  <img
                    alt="Product Image"
                    className="w-full h-48 object-cover"
                    height={400}
                    src={product.image || "/placeholder.svg"}
                    style={{
                      aspectRatio: "400/400",
                      objectFit: "cover"
                    }}
                    width={400}
                  />
                </Link>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      <span className="text-xs">SR</span>
                      {product.price}
                    </span>
                    <Button size="sm" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
