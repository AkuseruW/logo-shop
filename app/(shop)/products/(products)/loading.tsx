export default function Loading() {
  return (
    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 ">
      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index} className="w-full mb-5 ">
              <div className="w-full h-64 rounded-lg animate-pulse bg-gray-200"></div>
              <p className="w-30 h-2 mt-4 rounded-lg animate-pulse bg-gray-200"></p>
              <p className="w-24 h-2 mt-2 mb-5 rounded-lg animate-pulse bg-gray-200"></p>
            </div>
          )
        })}
    </div>

  );
}