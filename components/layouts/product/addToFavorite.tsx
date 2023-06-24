'use client'
import { HeartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Product } from '@/type';

interface AddToFavoriteProps {
    product: Product;
    session: any;
    isFavorite: boolean;
}


const AddToFavorite: React.FC<AddToFavoriteProps> = ({ product, session, isFavorite }) => {
    const router = useRouter()
    // @ts-ignore
    const { accessToken: token } = session
    const toggleFavorite = async () => {
        try {
            const response = await fetch('/api/add-to-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    userId: token,
                    isFavorite: !isFavorite,
                }),
            });

            if (response.ok) {
                router.refresh()
            } else {
                console.error('Une erreur s\'est produite lors de la requête.');
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    };
    return (
        <button
            className="text-gray-400 hover:text-gray-500 pb-8 pl-2"
            onClick={toggleFavorite}
        >
            <HeartIcon
                className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                style={{ fill: isFavorite ? '#EF4444' : 'none' }}
            />
        </button>
    )
}

export default AddToFavorite