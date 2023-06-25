import { Metadata } from "next"
import { DataTable } from '@/components/admin/dataTable';
import { columnsProduct } from '@/components/admin/dataTable/columns';
import { getProductsPaginate } from "@/controller/products/getProducts";

export const metadata: Metadata = {
  title: "Product List",
}

const getProducts = async (searchParams: string) => {
  const data = await getProductsPaginate(searchParams as any)
  return data
}

const Products = async ({ searchParams }: { searchParams: string }) => {
  const { products, totalPages } = await getProducts(searchParams);
  const url = '/dashboard/products'

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">List of Products</h2>
        </div>
      </div>
      <DataTable
        columns={columnsProduct}
        // @ts-ignore
        data={products}
        paginationUrl={url}
        pageSize={totalPages}
        initialPage={searchParams as any}
        type={'typeProduct'}
      />
    </div>
  )
}

export default Products