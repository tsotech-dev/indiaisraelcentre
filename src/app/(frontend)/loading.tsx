export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-iic-paper">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-stone-200" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-iic-saffron animate-spin"
            style={{ animationDuration: '0.75s' }}
          />
        </div>
        {/* Label */}
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-stone-400">
          Loading
        </p>
      </div>
    </div>
  )
}
