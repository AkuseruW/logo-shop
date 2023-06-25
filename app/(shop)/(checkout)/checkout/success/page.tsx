import { Metadata } from 'next';
import Stepper from "../../checkout/Stepper";
import ShowSucessDetail from '@/components/checkout/showSucessDetail';

export const metadata: Metadata = {
    title: 'Payment success',
    description: 'Thank you for your order!',
};

interface Params {
    searchParams: string;
}

const getOrder = async (searchParams: string) => {
    const queryParams = new URLSearchParams(searchParams)
    const res = await fetch(`${process.env.BASE_URL}/api/checkout/success?${queryParams}`, { cache: 'no-store' })

    return res.json();
};

const ConfirmationPage = async (params: Params) => {
    const { searchParams } = params
    const { order } = await getOrder(searchParams)

    return (
        <div className='bg-white'>
            <Stepper activeStep={3} />
            <ShowSucessDetail order={order} />
            
        </div>
    );
};

export default ConfirmationPage;
