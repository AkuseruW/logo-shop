import { getServerSession } from 'next-auth';
import { DataTable } from '@/components/admin/dataTable';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { columnsCategories } from '@/components/admin/dataTable/columns';
import { getAllCategories, getCategoryPaginate } from '@/controller/categories/getCategories';

const getCategories = async (searchParams: string) => {
  const categories = await getCategoryPaginate(searchParams as any)
  return categories
}

const CategoriesAdmin = async ({ searchParams }: { searchParams: string }) => {
  const session = await getServerSession(authOptions)
  const { categories, totalPages } = await getCategories(searchParams)
  const url = '/dashboard/categories'

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">List of Products</h2>
        </div>
      </div>
      <DataTable
        //@ts-ignore
        columns={columnsCategories}
        data={categories}
        url={url}
        pageSize={totalPages}
        initialPage={searchParams as any}
        type={'typeCategories'}
      />
    </div>
  )
}

export default CategoriesAdmin