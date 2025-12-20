
export default function Home() {
  return (
    <>
      <main className="page-content-wrapper">
        {/* Hero Section */}
        <section className="pt-12 pb-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-luxury-900 leading-tight">
                LUXURY FURNITURE
                <span className="block text-luxury-600 italic font-normal">
                  Collection
                </span>
              </h1>

              <div className="w-24 h-0.5 bg-linear-to-r from-luxury-900 to-luxury-400"></div>

              <p className="text-xl md:text-2xl text-luxury-700 max-w-3xl leading-relaxed font-light">
                Experience the epitome of elegance and craftsmanship. Our
                curated collection represents the finest in contemporary and
                classical furniture design.
              </p>
            </div>
          </div>
        </section>

        {/* Rest of your content */}
      </main>
    </>
  )
}
