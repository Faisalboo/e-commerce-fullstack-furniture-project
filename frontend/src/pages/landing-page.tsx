import { Link } from "react-router-dom"
import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"

import api from "@/api"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/ui/navBar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Product } from "@/types"
import { GlobalContext } from "@/App"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { HeroSection } from "@/components/heroSection"
import { Footer } from "@/components/ui/footer"

export function LandingPage() {
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
    <div className="min-h-screen bg-gray-950 text-gray-50">
      <header>
        <NavBar />
      </header>
      <HeroSection />
      <main>
        <section className="bg-gray-900 py-12 px-6 md:py-16 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Products</h2>
            </div>

            <div className="w-full">
              <Carousel className="flex w-full ">
                <CarouselContent className="-ml-1 w-full">
                  {data?.map((product) => (
                    <CarouselItem key={product.id} className="basis-1/4">
                      <div className="p-1">
                        <Card>
                          <CardHeader>
                            <Link to={`/products/${product?.id}`}>
                              <img
                                alt={product.name}
                                className="aspect-[4/3] w-full object-cover"
                                height={300}
                                src={product.image || "/placeholder.svg"}
                                width={400}
                              />
                              <CardTitle className="mt-4 space-y-2">{product.name}</CardTitle>
                              <CardDescription>
                                <span className="text-gray-400">
                                  <span className="text-xs">SR</span>
                                  {product.price}
                                </span>
                              </CardDescription>
                            </Link>
                          </CardHeader>
                          <CardContent>
                            <Button
                              className="w-full"
                              size="sm"
                              variant="primary"
                              onClick={() => handleAddToCart(product)}
                            >
                              Add to cart
                            </Button>
                          </CardContent>
                          <CardFooter></CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>
        <section className="py-12 px-6 md:py-16 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why Choose Our Store?
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-xl bg-gray-800 p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
                  <TruckIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Fast Shipping</h3>
                <p className="text-gray-400">
                  We offer fast and reliable shipping to ensure your products arrive quickly.
                </p>
              </div>
              <div className="rounded-xl bg-gray-800 p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
                  <ShieldCheckIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Secure Payments</h3>
                <p className="text-gray-400">
                  Our payment system is encrypted and secure, ensuring your information is
                  protected.
                </p>
              </div>
              <div className="rounded-xl bg-gray-800 p-6 shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
                  <SparklesIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Exceptional Quality</h3>
                <p className="text-gray-400">
                  We carefully curate our products to ensure they meet the highest standards of
                  quality.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}

function ShieldCheckIcon(props) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function SparklesIcon(props) {
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
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}

function TruckIcon(props) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}
