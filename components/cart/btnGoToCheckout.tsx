'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function BtnCheckout() {
    const router = useRouter();
    const { data: session } = useSession();

    function handleCheckoutClick() {
        if (session) {
            router.push("/checkout");
        } else {
            router.push("/signin");
        }
    }

    return (
        <button
            className="w-full py-3 rounded bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
            onClick={handleCheckoutClick}
        >
            Checkout
        </button>
    )
}
