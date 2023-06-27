'use client'
import { Products } from '@prisma/client';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { HeartIcon } from '@heroicons/react/24/outline';
import { addToFavoriteAction } from '@/controller/actions/_addToFavorite';
import { useRouter } from 'next/navigation';

const AddToFavorite = ({ item, session }: { item: Products, session: any }) => {
    const router = useRouter()
    const { toast } = useToast()

    const toggleFavorite = async () => {
        console.log(session)
        if (!session) {
            const callbackUrl = encodeURIComponent(`/products/${item.slug}`);
            router.push(`/signin?callbackUrl=${callbackUrl}`)
        } else {
            const data = { item, session }
            const response = await addToFavoriteAction(data)

            if (response.message) {
                toast({
                    description: `${response.message}`,
                })
            }
        }

    };

    return (
        <button
            onClick={toggleFavorite}
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-md border border-black bg-white py-3 px-8 text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:bg-gray-200 focus:ring-offset-2"
        >
            <span className="mr-1">
                <HeartIcon className="h-6 w-6" />
            </span>
            Add to favorite
        </button>
    )
}

export default AddToFavorite