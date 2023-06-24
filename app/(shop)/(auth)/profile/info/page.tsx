import { Metadata } from 'next'
import { getSession } from "@/lib/next-auth"
import ProfileInfoTabs from "@/components/profile/profileInfo"
import Breadcrumbs from '@/components/breadcrumbs';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Profile info',
};


const InfoProfile = async () => {
    const session = await getSession()
    return (
        <div className='max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
            <Breadcrumbs />
            <ProfileInfoTabs session={session} />
        </div>
    )
}

export default InfoProfile