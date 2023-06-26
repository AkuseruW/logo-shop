import { getCategoryBySlug } from "@/controller/categories/getCategory";
import { CategoryFormUpdate } from "@/components/admin/form/categories/patch";

const getCategories = async ({ slug }: { slug: string }) => {
  const category = await getCategoryBySlug(slug)
  return category
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { category } = await getCategories({ slug });

  return (
    <div>
      <CategoryFormUpdate category={category} />
    </div>
  )
}

export default page
