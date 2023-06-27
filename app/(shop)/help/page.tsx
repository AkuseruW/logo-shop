import React from 'react';

const Help = () => {
    return (
        <div className=" py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl text-center mb-8 font-bold text-gray-800">Welcome to our Help page!</h1>
                <div className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl mb-6 font-semibold text-gray-800">FAQ (Frequently Asked Questions):</h2>
                    <ol className="space-y-6">
                        <li>
                            <h3 className="text-xl font-semibold text-gray-800">How can I place an order?</h3>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur consequat mi, eget tincidunt dui
                                viverra eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque nec
                                dui sit amet leo cursus eleifend.
                            </p>
                        </li>
                        <li>
                            <h3 className="text-xl font-semibold text-gray-800">What payment methods do you accept?</h3>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at elit vel libero condimentum efficitur vel nec sem.
                                Morbi accumsan nisi et ligula efficitur, a vestibulum sapien pharetra.
                            </p>
                        </li>
                        <li>
                            <h3 className="text-xl font-semibold text-gray-800">What is your return policy?</h3>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id neque elit. Vestibulum aliquet metus vitae erat mollis,
                                ut fringilla odio feugiat. Nunc vel ligula sed nisl congue molestie.
                            </p>
                        </li>
                        <li>
                            <h3 className="text-xl font-semibold text-gray-800">How long does it take for my order to arrive?</h3>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur, quam vitae efficitur lacinia, metus quam
                                faucibus mauris, nec feugiat metus nibh id ante. Donec sollicitudin eleifend justo eget ullamcorper.
                            </p>
                        </li>
                        <li>
                            <h3 className="text-xl font-semibold text-gray-800">How can I track my order?</h3>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut quam id diam congue convallis id ac turpis. Sed et
                                ultrices ex.
                            </p>
                        </li>
                    </ol>
                    <p className="mt-8 text-gray-600">
                        If you have any other questions. We are here to assist you!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Help;
