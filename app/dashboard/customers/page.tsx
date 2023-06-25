import { DataTable } from '@/components/admin/dataTable';
import { columnsCustomers } from '@/components/admin/dataTable/columns';
import { getCustomersPaginate } from '@/controller/_dashboard/customers/_get';


async function getCustomers(searchParams: string) {
  const customers = await getCustomersPaginate(searchParams as any)
  return customers
}

export default async function Products({ searchParams }: { searchParams: string }) {
  const { customers, totalPages } = await getCustomers(searchParams);
  const url = '/dashboard/customers'

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">List of Customers</h2>
        </div>
      </div>
      <DataTable
      // @ts-ignore
        columns={columnsCustomers}
        type={'typeCustomers'}
        data={customers}
        url={url}
        pageSize={totalPages}
        initialPage={searchParams as any}
      />
    </div>
  );
}
