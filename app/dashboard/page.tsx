import { Metadata } from "next"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Overview } from "@/components/admin/overview"
import { RecentSales } from "@/components/admin/recent-sales"
import { countOrderOfCurrentMount, countOrderPaid, monthlyData, totalCustomers, totalOrder } from "@/controller/_dashboard/dashboard"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Logo",
}

const countCustomers = async () => {
  const customers = await totalCustomers()
  return customers
}

const orderPaid = async () => {
  const isPaid = await countOrderPaid()
  return isPaid
}

const countOrderOfMount = async () => {
  const order = await countOrderOfCurrentMount()
  return order
}

const fetchTotalOrders = async () => {
  const totalOrders = await totalOrder()
  return totalOrders
}

const fetchMonthlyData = async () => {
  const data = await monthlyData()
  const { monthlyTotals } = data

  const getMonthName = (monthIndex: number) => {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return monthNames[monthIndex]
  }

  const formattedData = monthlyTotals.map((total: number, index: number) => ({
    name: getMonthName(index),
    total,
  }));

  return formattedData
}

const DashboardPage = async () => {
  const { orderCount } = await countOrderOfMount()
  const { isPaid, isDelivered } = await orderPaid()
  const overviewData = await fetchMonthlyData()
  const { totalRevenue } = await fetchTotalOrders()
  const { customers } = await countCustomers()

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">&euro;{totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customers}</div>
                  <p className="text-xs text-muted-foreground">

                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isPaid}</div>
                  <p className="text-xs text-muted-foreground">
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{isDelivered}</div>
                  <p className="text-xs text-muted-foreground">
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview overviewData={overviewData} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made {orderCount} sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Last Order */}
                  {/* @ts-expect-error Server Component */}
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DashboardPage