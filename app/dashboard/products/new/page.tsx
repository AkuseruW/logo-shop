import React from 'react'
import { getSession } from '@/lib/next-auth'
import { ProductForm } from '@/components/admin/form/products/create'
import { getAllCategories } from '@/controller/categories/getCategories'

const getCategories = async () => {
  const categories = await getAllCategories()
  return categories
}

export default async function CreateProduct() {
  const session = await getSession()
  const { categories } = await getCategories()

  return (
    <div>
      <ProductForm session={session} categories={categories} />
    </div>
  )
}
