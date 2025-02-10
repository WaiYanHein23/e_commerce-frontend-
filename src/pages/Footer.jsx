const Footer = () => {
  return (
    <div className="mt-10">
      <footer className="bg-gray-800 text-white">
        <div className="mx-auto w-full max-w-screen-xl">
          {/* New Section: Free Delivery, Money-Back Guarantee, Secure Payment */}
          <div className="grid grid-cols-3 gap-4 px-4 py-6 bg-gray-700 text-center">
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10 text-yellow-400 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 6h16v12H4zM2 8v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h-2v8H4V8H2zm4-2h12V4H6v2zm13 6h-2v2h2v-2zm-4 0h-2v2h2v-2zm-4 0H9v2h2v-2z" />
              </svg>
              <p className="font-semibold">Free Delivery</p>
              <p className="text-sm text-gray-300">On all orders above $50</p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10 text-green-400 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 0 0-7.09 16.91A9.96 9.96 0 0 0 12 22a10 10 0 0 0 7.09-17.91A9.96 9.96 0 0 0 12 2zm0 18a8 8 0 1 1 5.66-2.34A8 8 0 0 1 12 20zm1-11h-2v6h6v-2h-4V9z" />
              </svg>
              <p className="font-semibold">Money-Back Guarantee</p>
              <p className="text-sm text-gray-300">30-day easy returns</p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10 text-blue-400 mb-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 5.66-2.34A8 8 0 0 1 12 20zm-1-6h2v2h-2zm0-6h2v4h-2z" />
              </svg>
              <p className="font-semibold">Secure Payment</p>
              <p className="text-sm text-gray-300">100% secure transactions</p>
            </div>
          </div>

          {/* Existing Company Info Section */}
          <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase dark:text-white">
                Company
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Brand Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase dark:text-white">
                Categories
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Men
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Women
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Kids
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase dark:text-white">
                Get In Touch
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    0987654321
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    hwaiyan913@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
              © 2025 <a href="https://flowbite.com/">Flowbite™</a>. All Rights
              Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
