import { GlobalContext } from "@/App"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/ui/footer"
import { NavBar } from "@/components/ui/navBar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useContext, useState } from "react"

export function Cart() {
  const context = useContext(GlobalContext)

  if (!context) throw Error("Context not found")
  const { state, handleDeleteFromCart } = context
  console.log("context:", state)

  const [productQuantity, setProductQuantity] = useState<number>(1)
  const handleQuantityChange = (value: string) => {
    setProductQuantity(Number(value))
  }
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div>
        <Table>
          <TableCaption>A list of all Products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Prodcut img</TableHead>
              <TableHead>Prodcut Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.cart?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <img height={200} width={200} src={product.image || "/placeholder.svg"} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Select onValueChange={handleQuantityChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <span className="text-xs">SR </span>
                  {product.price * productQuantity}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" onClick={() => handleDeleteFromCart(product.id)}>
                    X
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Products</TableCell>
              <TableCell className="text-right">{state.cart?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <Footer />
    </div>
  )
}
