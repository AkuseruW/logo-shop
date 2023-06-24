import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Order {
    id: string;
    user: {
        name: string;
        email: string;
    };
    totalPrice: number;
}

const getLastOrder = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/dashboard/get-last-order`)
    return res.json()
}

export const RecentSales = async () => {
    const { orders }: { orders: Order[] } = await getLastOrder();

    return (
        <div className="space-y-8">
            {orders.map((order) => (
                <div key={order.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>{order.user?.name ? order.user.name.split(' ').map(name => name.charAt(0)).join(' ') : ''}</AvatarFallback>
                    </Avatar>

                    <div className="ml-4 space-y-1">
                        {order.user ? (
                            <>
                                <p className="text-sm font-medium leading-none">{order.user.name}</p>
                                <p className="text-sm text-muted-foreground">{order.user.email}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-medium leading-none">User: Not available</p>
                                <p className="text-sm text-muted-foreground">Email: Not available</p>
                            </>
                        )}
                    </div>
                    <div className="ml-auto font-medium">+&euro;{order.totalPrice.toFixed(2)}</div>
                </div>
            ))}
        </div>
    )
}

