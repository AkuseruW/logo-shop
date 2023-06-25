import React from 'react'
import ContactForm from './contactForm'

const page = () => {

  return (
    <div className="flex justify-center h-[85vh] flex-col max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact us</h2>
        <ContactForm />
    </div>
  )
}

export default page
