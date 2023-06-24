import Aside from "@/components/layouts/products/aside";
import Filter from "@/components/layouts/products/filter";
import { GetCategories } from "@/controller/categories/GetCategories";
import { prisma } from "@/lib/prisma";

const getCategories = async () => {
    const categories = await GetCategories()
    return categories
}


export default async function Template({ children }: { children: React.ReactNode }) {
    const { categories } = await getCategories()

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Filter />

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <Aside categories={categories} />

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {children}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}