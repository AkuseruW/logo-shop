import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CategoryFormCreate } from '@/components/admin/form/categories/create'

const CategoryCreate = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <CategoryFormCreate session={session}/>
        </div>
    )
}

export default CategoryCreate
