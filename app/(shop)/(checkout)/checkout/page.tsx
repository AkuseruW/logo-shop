import { Metadata } from 'next';
import Stepper from "../checkout/Stepper";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
    title: 'Checkout',
    description: 'Complete your checkout process',
};

const Checkout = () => {
    return (
        <div className="w-full md:py-20">
            <Stepper activeStep={1} />
            <CheckoutForm />
        </div>
    );
};

export default Checkout;
