import api from "@/api"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@/types"
import { Link } from "react-router-dom"
import { MenuIcon, Package2Icon } from "lucide-react"

export default function Home() {
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
    <div className="App">
      <header className="flex items-center justify-between px-6 py-4">
        <Link className="flex items-center gap-2" to="#">
          <Package2Icon className="h-6 w-6" />
          <span className="text-xl font-semibold">Acme Store</span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link className="hover:underline" to="#">
            Shop
          </Link>
          <Link className="hover:underline" to="#">
            About
          </Link>
          <Link className="hover:underline" to="#">
            Contact
          </Link>
        </nav>
        <Button className="md:hidden" size="sm" variant="outline">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
      <main>
        <section className="grid grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 lg:px-12 xl:px-24">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Discover the Best Products for Your Home
            </h1>
            <p className="text-lg text-gray-400">
              Explore our curated collection of high-quality home decor and furnishings.
            </p>
            <div>
              <Button className="w-full sm:w-auto" size="lg" variant="primary">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              alt="Hero product"
              className="aspect-[4/3] w-full object-cover"
              height={600}
              src="src/imgs/hero.jpg"
              width={800}
            />
          </div>
        </section>

        <h1 className="text-2xl uppercase mb-10">Products</h1>
        <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
          {data?.map((product) => (
            <Card key={product.id} className="w-[350px]">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>Some Description here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content Here</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </section>
        {error && <p className="text-red-500">{error.message}</p>}
      </main>
      <footer className="bg-gray-900 py-6 px-6 text-center text-sm text-gray-400 md:py-8 md:px-12 lg:px-24">
        <p>© 2024 Acme Store. All rights reserved.</p>
      </footer>
    </div>
  )
}
