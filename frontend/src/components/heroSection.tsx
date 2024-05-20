import { Link } from "react-router-dom"
import { Button } from "./ui/button"

export function HeroSection() {
  return (
    <div>
      <section className="grid grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 lg:px-12 xl:px-24">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Discover the Best Products for Your Home
          </h1>
          <p className="text-lg text-gray-400">
            Explore our curated collection of high-quality home decor and furnishings.
          </p>
          <div>
            <Link to="/products">
              <Button className="w-full sm:w-auto" size="lg" variant="primary">
                Shop Now
              </Button>
            </Link>
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
    </div>
  )
}
