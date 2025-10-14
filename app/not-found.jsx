import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-center text-white">
      {/* Rain overlay using Tailwind */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.1))] bg-[length:1px_100px] animate-[rain_0.5s_linear_infinite]" />

      <div className="relative z-10 p-6">
        <div className="text-8xl animate-bounce mb-4">😔</div>
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Lost in the Rain...</h2>
        <p className="text-gray-300 max-w-md mx-auto mb-8">
          Looks like this page got drenched and washed away.  
          Let’s head back before the storm gets worse.
        </p>
        <Link href="/">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3 transition">
            Take Me Home 🌈
          </Button>
        </Link>
      </div>
    </div>
  );
}
