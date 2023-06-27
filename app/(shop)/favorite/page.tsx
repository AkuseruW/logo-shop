import ProductGridItems from '@/components/layouts/product-grid-items'
import { myFavorite } from '@/controller/favorite/getFavorite'
import { getSession } from '@/lib/next-auth'
import React from 'react'

const getFavorite = async () => {
  const session = await getSession()
  const favorite = await myFavorite(session)
  return favorite
}

const Favorite = async () => {
  const { favorites } = await getFavorite()
  const products = favorites.map((favorite) => favorite.product);

  return (
    <div className=" py-8">
        <h1 className="text-3xl text-center mb-8 font-bold text-gray-800">My Favorite Products</h1>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-600">You have no favorite products.</p>
        ) : (
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            {/* affichage des produits */}
            <ProductGridItems items={products} />
          </div>
        )}
    </div>
  )
}

export default Favorite
