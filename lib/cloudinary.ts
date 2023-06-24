import crypto from 'crypto'

const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET
const timestamp = Math.floor(Date.now() / 1000)


export const uploadImageToCloudinary = async (image: any) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', 'logo_commerce')

  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Failed to upload image to Cloudinary: ${response.status} ${response.statusText}`)
  }

  const responseData = await response.json()
  const { public_id, secure_url } = responseData

  return { cover_id: public_id, cover_url: secure_url }
};


export const deleteImageFromCloudinary = async (publicId: string) => {
  const paramString = `invalidate=true&public_id=${publicId}&timestamp=${timestamp}`
  const stringToSign = `${paramString}${apiSecret}`
  const signature = crypto.createHash('sha1').update(stringToSign).digest('hex')

  const data = `invalidate=true&public_id=${publicId}&timestamp=${timestamp}&signature=${signature}&api_key=${apiKey}`

  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete image from Cloudinary: ${response.status} ${response.statusText}`)
  }

  const responseData = await response.json()

  return responseData
};