import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Category, Product } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function Dashboard() {
  const queryClient = useQueryClient()
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
    categoryId: ""
  })

  const [category, setCategory] = useState({
    name: ""
  })

  const postCategory = async () => {
    try {
      const res = await api.post("/categorys", category)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleCategoryChange = (e) => {
    setCategory({
      name: e.target.value
    })
  }
  const handleCategorySubmit = async (e) => {
    e.preventDefault()
    console.log("category submit value is: ", category.name)
    await postCategory()
    queryClient.invalidateQueries({ queryKey: ["category"] })
  }

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    // console.log({ name }, { value })

    setProduct({
      ...product,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("submit value is: ", product)
    await postProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }

  //fetch products
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  // Queries for products
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  //fetch categories
  const getCategorys = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  // Queries for categories
  const { data: categories, error: caterror } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: getCategorys
  })
  const productWithCategory = products?.map((product) => {
    const category = categories?.find((cat) => cat.id == product.categoryId)
    if (category) {
      return {
        ...product,
        categoryId: category.name
      }
    }
    return product
  })

  return (
    <div>
      <h1>Hello dashboard</h1>
      <div className="flex justify-evenly">
        <form
          action=""
          className="grid w-full max-w-sm items-center gap-1.5"
          onSubmit={handleSubmit}
        >
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add Product</h3>

          <Label htmlFor="name">Product Name</Label>
          <Input
            name="name"
            type="text"
            id="name"
            placeholder="Product Name"
            onChange={handleChange}
          />

          <Label htmlFor="price">Product Price</Label>
          <Input
            name="price"
            type="number"
            id="price"
            placeholder="Product Price"
            onChange={handleChange}
          />

          <Label htmlFor="quantity">Product Quantity</Label>
          <Input
            name="quantity"
            type="number"
            id="quantity"
            placeholder="Product Quantity"
            onChange={handleChange}
          />

          <Label htmlFor="description">Product description</Label>
          <Input
            name="description"
            type="text"
            id="description"
            placeholder="Product Description"
            onChange={handleChange}
          />

          <Label htmlFor="image">Product image</Label>
          <Input
            name="image"
            type="text"
            id="image"
            placeholder="Product image"
            onChange={handleChange}
          />

          <Label htmlFor="categoryId">Category Id</Label>
          <Input
            name="categoryId"
            type="text"
            id="categoryId"
            placeholder="Category Id"
            onChange={handleChange}
          />

          <div className="flex justify-between">
            <Button variant="outline" type="reset" className="mt-2">
              Reset
            </Button>
            <Button variant="secondary" type="submit" className="mt-2">
              Submit
            </Button>
          </div>
        </form>

        <div>
          <form
            action=""
            className="grid w-full max-w-sm items-center gap-1.5"
            onSubmit={handleCategorySubmit}
          >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add Category</h3>

            <Label htmlFor="name">Category Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Category Name"
              onChange={handleCategoryChange}
            />

            <div className="flex justify-between">
              <Button variant="outline" type="reset" className="mt-2">
                Reset
              </Button>
              <Button variant="secondary" type="submit" className="mt-2">
                Submit
              </Button>
            </div>
          </form>
          <Table>
            {/* <TableCaption>A list of all Categories.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Category Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCell colSpan={5}>Total Categories</TableCell>
            <TableCell className="text-right">{categories?.length}</TableCell>
          </Table>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of all Products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Prodcut Name</TableHead>
              <TableHead>Prodcut Id</TableHead>
              <TableHead>Category Id</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.categoryId}</TableCell>
                <TableCell>
                  <span className="text-xs">SR </span>
                  {product.price}
                </TableCell>
                <TableCell className="text-right">{product.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Products</TableCell>
              <TableCell className="text-right">{products?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
