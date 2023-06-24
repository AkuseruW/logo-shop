'use client'
import BtnCheckout from "@/components/cart/btnGoToCheckout";
import { Separator } from "@/components/ui/separator";

interface SummaryProps {
    qty: { [key: string]: number };
    data: {
        id: string;
        price: number;
    }[];
}

const Summary = ({ qty, data }: SummaryProps) => {
    const calculateSubtotal = () => {
        return data.reduce((acc, item) => acc + item.price * qty[item.id], 0);
    };

    const calculateTaxes = () => {
        return data.reduce((acc, item) => acc + item.price * qty[item.id] * 0.21, 0);
    };

    const calculateTotal = () => {
        return data.reduce((acc, item) => acc + item.price * qty[item.id] * 1.21, 0);
    };

    return (
        <div>
            <div className="text-lg font-bold">Summary</div>

            <div className="p-5 my-4 bg-gray-100 bg-opacity-8">
                <div className="flex justify-between py-1">
                    <div className="uppercase text-md font-medium text-black">
                        Subtotal
                    </div>
                    <div className="text-md font-medium text-black">
                        &euro; {calculateSubtotal().toFixed(2)}
                    </div>
                </div>

                <div className="flex justify-between py-1">
                    <div className="uppercase text-md font-medium text-black">
                        Deliveries
                    </div>
                    <div className="text-md font-medium text-black">&euro; 0</div>
                </div>

                <div className="flex justify-between py-1">
                    <div className="uppercase text-md font-medium text-black">Taxes</div>
                    <div className="text-md font-medium text-black">
                        &euro; {calculateTaxes().toFixed(2)}
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between">
                    <div className="uppercase text-md md:text-md font-medium text-black">
                        Total{" "}
                    </div>
                    <div className="text-md font-medium text-black">
                        &euro; {calculateTotal().toFixed(2)}
                    </div>
                </div>
            </div>
            <BtnCheckout />
        </div>
    );
};

export default Summary;
