export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-yellow-100 z-50">
      <div className="relative w-24 h-24 animate-spin-slow">

        <div
          className="absolute inset-0 rounded-full border-[8px] border-transparent
            bg-gradient-to-r from-yellow-500 via-yellow-00 to-yellow-600
            shadow-inner
            [mask-image:radial-gradient(farthest-side,transparent_calc(100%-8px),black_0)]
            [mask-repeat:no-repeat]"
        ></div>

        <div
          className="absolute inset-0 rounded-full border-[8px] border-transparent
            bg-gradient-to-r from-transparent via-white/50 to-transparent
            [mask-image:radial-gradient(farthest-side,transparent_calc(100%-8px),black_0)]
            [mask-repeat:no-repeat]
            animate-[spin_2s_linear_infinite]"
        ></div>

        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full 
            bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg"
        ></div>

        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 
            bg-gradient-to-br from-white via-gray-500 to-gray-200
            rotate-45 shadow-lg border-2 border-white"
        ></div>
      </div>
    </div>
  );
}
