import React, { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ isLoading }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); 
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div class="flex items-center justify-center bg-gray-100">
      <div class="relative w-24 h-24 animate-spin-slow">
        <div
          class="absolute inset-0 rounded-full border-[8px] border-transparent
                bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600
                shadow-inner
                [mask-image:radial-gradient(farthest-side,transparent calc(100%-8px),black 0)]
                [mask-repeat:no-repeat]"
        ></div>

        <div
          class="absolute inset-0 rounded-full border-[8px] border-transparent
                bg-gradient-to-r from-transparent via-white/50 to-transparent
                [mask-image:radial-gradient(farthest-side,transparent calc(100%-8px),black 0)]
                [mask-repeat:no-repeat]
                animate-[spin_2s_linear_infinite]"
        ></div>

        <div
          class="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full 
                bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg"
        ></div>

        <div
          class="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full
                bg-gradient-to-br from-blue-300 via-blue-500 to-blue-800
                shadow-lg border-2 border-white"
        ></div>
      </div>
    </div>
  );
}
