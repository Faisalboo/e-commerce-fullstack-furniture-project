import { Link } from "react-router-dom"

export function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 py-6 px-6 text-center text-sm text-gray-400 md:py-8 md:px-12 lg:px-24 mt-2">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-20">
          <div className="grid gap-2">
            <Link className="text-sm font-medium hover:underline" to="#">
              Privacy Policy
            </Link>
            <Link className="text-sm font-medium hover:underline" to="#">
              Terms of Service
            </Link>
            <Link className="text-sm font-medium hover:underline" to="#">
              Refund Policy
            </Link>
          </div>
          <div className="grid gap-2">
            <Link className="text-sm font-medium hover:underline" to="#">
              About Us
            </Link>
            <Link className="text-sm font-medium hover:underline" to="#">
              Contact Us
            </Link>
            <Link className="text-sm font-medium hover:underline" to="#">
              Careers
            </Link>
          </div>
        </div>
        <div className="text-sm text-gray-400 mt-4">
          © 2024 Omair Ecommerce. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
