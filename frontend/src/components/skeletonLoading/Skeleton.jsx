const Skeleton = () => {
  return (
    <div className="ml-0 lg:ml-64 md:ml-16 pt-16 p-3 md:p-4 transition-all duration-300">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Skeleton for main content */}
        <div className="xl:col-span-2 space-y-3 sm:space-y-4">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-purple-100 animate-pulse">
            <div className="h-6 bg-purple-100 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-purple-100 rounded w-full"></div>
              <div className="h-4 bg-purple-100 rounded w-5/6"></div>
              <div className="h-4 bg-purple-100 rounded w-2/3"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-purple-100 animate-pulse">
            <div className="h-6 bg-purple-100 rounded w-1/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-purple-100 rounded w-full"></div>
              <div className="h-4 bg-purple-100 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Skeleton for statistics sidebar */}
        <div className="xl:col-span-1 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-purple-100 animate-pulse">
            <div className="h-5 bg-purple-100 rounded w-1/2 mb-4"></div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="p-2 sm:p-3 rounded-xl bg-purple-50 animate-pulse"
                >
                  <div className="h-4 bg-purple-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-purple-100 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="h-3 bg-purple-100 rounded w-full mb-2"></div>
            <div className="h-2 bg-purple-100 rounded w-3/4"></div>
          </div>
          <div className="bg-white rounded-xl mt-4 p-4 sm:p-5 shadow-sm border border-purple-100 animate-pulse">
            <div className="h-5 bg-purple-100 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 sm:p-3 bg-purple-50 rounded-lg"
                >
                  <div className="h-4 bg-purple-200 rounded w-2/3"></div>
                  <div className="h-3 bg-purple-100 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
