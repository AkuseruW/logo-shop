import React from 'react'
import { ProductForm } from '@/components/admin/form/products/create'
import { getAllCategories } from '@/controller/categories/getCategories'

const getCategories = async () => {
  const categories = await getAllCategories()
  return categories
}

export default async function CreateProduct() {
  const { categories } = await getCategories()

  return (
    <div>
      <ProductForm  categories={categories} />
    </div>
  )
}
