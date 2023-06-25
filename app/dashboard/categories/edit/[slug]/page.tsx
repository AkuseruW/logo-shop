import { notFound } from "next/navigation";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CategoryFormUpdate } from "@/components/admin/form/categories/patch";
import { getCategoryBySlug } from "@/controller/categories/getCategory";

const getCategories = async ({ slug }: { slug: string }) => {
  const category = await getCategoryBySlug(slug)
  return category
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const session = await getServerSession(authOptions)
  const { category } = await getCategories({ slug });

  return (
    <div>
      <CategoryFormUpdate category={category} session={session} />
    </div>
  )
}

export default page
