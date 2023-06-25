'use client'

import { getError } from "@/utils/error";

const BtnPayment = ({ total }: { total: number }) => {
    const handlePayment = async () => {
        try {
            const res = await fetch(`/api/checkout/payment`, {
                method: 'POST',
            });

            if (res.ok) {
                const urlStripe = await res.json();
                window.location.href = urlStripe
            }
        } catch (error) {
            console.log(getError(error))
        }
    };

    return (
        <button
            className="py-3 rounded bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center w-64 border-2 border-black"
            id="checkout-button"
            onClick={handlePayment}
        >
            Pay <span className="text-2xl">&#8594;</span> {total.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
            })}
        </button>
    );
};

export default BtnPayment;
