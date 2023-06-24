import React from 'react'
import PasswordReset from './form'
import { verifyJwtPasswordReset } from '@/lib/jwt';

const getTokenDecode = async (token: string) => {
  try {
    const decodedToken = await verifyJwtPasswordReset(token)
    return decodedToken;
  } catch (error) {
    return { expired: true };
  }
};

const page = async ({ params }: { params: { token: string } }) => {

  const { token } = params
  const tokendecoded = await getTokenDecode(token)

  if (tokendecoded.expired) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-500">Invalid token</h1>
      </div>
    )
  } else {
    return (
      <div className="flex justify-center h-[70vh] flex-col sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset your password</h1>
        <PasswordReset token={token} />
      </div>
    )
  }
}

export default page
