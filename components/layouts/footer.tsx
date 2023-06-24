import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-gray-900">
      <hr className="my-8" />
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between py-8">
          <div className="w-full sm:w-[40%] lg:w-[20%] mb-8 lg:mb-0">
            <h2 className="font-bold text-lg mb-4">Our Company</h2>
            <ul className="list-reset">
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-[60%] lg:w-[20%] mb-8 lg:mb-0">
            <h2 className="font-bold text-lg mb-4">Support</h2>
            <ul className="list-reset">
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full sm:w-[40%] lg:w-[20%] mb-8 lg:mb-0">
            <h2 className="font-bold text-lg mb-4">Social Media</h2>
            <ul className="list-reset">
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gray-700">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-[60%] lg:w-[40%] mb-8 lg:mb-0">
            <h2 className="font-bold text-lg mb-4">Subscribe to Newsletter</h2>
            <p className="text-gray-400 mb-4">Get the latest news and promotions.</p>
            <form className="flex flex-col sm:flex-row items-center">
              <label htmlFor="newsletter" className="sr-only">
                Enter your email address
              </label>
              <input
                type="email"
                id="newsletter"
                name="newsletter"
                className="bg-gray-200 rounded-lg text-gray-900 py-2 px-4 focus:outline-none mb-4 sm:mb-0 sm:mr-4 max-w-full"
                placeholder="Enter your email address"
              />
              <button className="bg-black rounded-lg px-4 py-2 text-white hover:bg-stone-800 focus:outline-none focus:bg-black-500 focus:ring-offset-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">&copy; 2023 LOGO. School project.</p>
        </div>
      </div>
    </footer>

  )
}
