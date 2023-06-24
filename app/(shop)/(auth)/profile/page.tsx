import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
}

const Profile = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">My Profile</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center mt-[20vh] sm:mt-[15vh]">
        <Link href="/profile/info" className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300 transform hover:scale-105" passHref>
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Personal Information</h3>
          <p className="text-gray-600">Update your personal details</p>
        </Link>

        <Link href="/profile/orders" className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300 transform hover:scale-105" passHref>
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">My Orders</h3>
          <p className="text-gray-600">View and track your orders</p>
        </Link>

        <Link href="/profile/settings" className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300 transform hover:scale-105" passHref>
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Settings</h3>
          <p className="text-gray-600">Manage your profile settings</p>
        </Link>
      </div>
    </div>
  );
}

export default Profile;