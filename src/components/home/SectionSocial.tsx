import Link from "next/link";

export default function SectionSocial() {
  return (
    <section
      id="section-social"
      className="p-4 sm:p-8 bg-gray-100 dark:bg-gray-900 dark:text-white"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-2">
          Sunny Social Island
        </h2>
        <div className="text-center mb-8">
          {/* Centered logo */}
          <img
            src="/SunnyIslandSymbol.png"
            alt="Sunny Island Symbol"
            className="mx-auto w-16 h-16 mb-2"
          />
          <p className="text-sm sm:text-base">
            Connect and tag us @SunnyIslandPepperSauce!
          </p>
        </div>

        {/* Thumbnails (just placeholders) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Video 1 */}
          <div className="bg-white dark:bg-black rounded shadow p-4 flex justify-center items-center min-h-[150px]">
            <p>Video / IG Reel 1</p>
          </div>
          {/* Video 2 */}
          <div className="bg-white dark:bg-black rounded shadow p-4 flex justify-center items-center min-h-[150px]">
            <p>Video / IG Reel 2</p>
          </div>
          {/* Video 3 */}
          <div className="bg-white dark:bg-black rounded shadow p-4 flex justify-center items-center min-h-[150px]">
            <p>Video / IG Reel 3</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center space-x-4">
          <Link href="#" className="underline hover:text-secondary">
            Instagram
          </Link>
          <Link href="#" className="underline hover:text-secondary">
            TikTok
          </Link>
          <Link href="#" className="underline hover:text-secondary">
            Facebook
          </Link>
          <Link href="#" className="underline hover:text-secondary">
            YouTube
          </Link>
        </div>
      </div>
    </section>
  );
}
