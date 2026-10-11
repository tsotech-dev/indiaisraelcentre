export default function ConveningLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="relative bg-iic-ink text-white overflow-hidden border-b border-iic-navy">
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-16 animate-pulse">
          {/* Breadcrumb */}
          <div className="h-3 w-32 bg-white/10 rounded mb-8" />
          {/* Format badge */}
          <div className="h-5 w-24 bg-iic-saffron/20 rounded-full mb-6" />
          {/* Title */}
          <div className="space-y-3 mb-8">
            <div className="h-8 w-3/4 bg-white/10 rounded" />
            <div className="h-8 w-1/2 bg-white/10 rounded" />
          </div>
          {/* Date badge */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-iic-saffron/30 rounded-sm" />
            <div className="h-4 w-36 bg-white/10 rounded" />
          </div>
        </div>
      </section>

      {/* Body skeleton */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14 animate-pulse space-y-4">
          <div className="h-4 w-full bg-stone-200 rounded" />
          <div className="h-4 w-5/6 bg-stone-200 rounded" />
          <div className="h-4 w-4/6 bg-stone-200 rounded" />
          <div className="h-4 w-full bg-stone-200 rounded" />
          <div className="h-4 w-3/4 bg-stone-200 rounded" />
        </div>
      </section>
    </>
  )
}
