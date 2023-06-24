
const Loading = () => {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div>
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg lg:block">
              <div className="w-full h-64 rounded-lg animate-pulse bg-gray-200"></div>
            </div>
          </div>
          <div className="lg:border-r lg:border-gray-200 lg:pr-8">
            <p className="w-30 h-2 mb-8 rounded-lg animate-pulse bg-gray-200"></p>
            <div className="space-y-2">
              <p className="w-30 h-2 mb-4 rounded-lg animate-pulse bg-gray-200"></p>
              <p className="w-30 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
              <p className="w-30 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
              <p className="w-30 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
              <p className="w-30 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
              <p className="w-30 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
              <p className="w-30 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
              <p className="w-30 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
            </div>
          </div>
          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="w-10 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>

            {/* Reviews */}
            <div className="mt-6">
              <p className="w-20 h-2 rounded-lg animate-pulse bg-gray-200"></p>
              <div className=" items-center">
                <p className="w-20 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
                <p className="w-30 h-2 mt-2 rounded-lg animate-pulse bg-gray-200"></p>

                <div className='mt-6'>
                  <p className="w-20 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
                  <p className="w-30 h-2 mt-2 rounded-lg animate-pulse bg-gray-200 block w-full p-2.5"></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading
