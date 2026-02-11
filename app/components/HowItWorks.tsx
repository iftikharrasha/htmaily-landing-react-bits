
const HowItWorks = () => {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      <div className="relative mx-auto w-full max-w-360 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0ACF83] bg-black mb-6">
              <span className="text-xs font-medium text-[#0ACF83]">
                Templates built on Real Brand
              </span>
            </div>
            
            <h2
              className="text-5xl font-bold text-[#FAFAFA] mb-4"
              style={{ fontFamily: '"Inria Serif", serif' }}
            >
              Templates built on
              <br />
              Real Brand
            </h2>

            <p className="text-6xl font-bold text-[#FAFAFA] mb-2" style={{ fontFamily: '"Inria Serif", serif' }}>
              126+
            </p>
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-8">
              Production ready templates
            </p>

            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              Small lorem ipsum here small lorem ipsum here small lorem ipsum here 
              small lorem ipsum here small lorem ipsum here.
            </p>
          </div>

          {/* Right Content - Card Swap */}
          <div className="flex-1 relative" style={{ height: '600px' }}>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
