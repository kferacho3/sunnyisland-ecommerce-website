import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
            Connect and tag us @SunnyIslandPepper!
          </p>
        </div>

        {/* Social Media Containers */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
          {/* Facebook */}
          <Link
            href="https://www.facebook.com/SunnyIslandPepper"
            target="_blank"
            className="block"
          >
            <div className="rounded-lg p-3 flex flex-col items-center justify-center transition transform duration-300 hover:scale-105 hover:brightness-110 bg-gradient-to-r from-[#006fff] to-[#00acff] shadow-[0px_20px_20px_-17px_rgba(0,111,255,0.53)] hover:shadow-[0px_20px_35px_-16px_rgba(0,111,255,0.65)]">
              <img
                src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandFacebook.webp"
                alt="Facebook"
                className="w-[370px] h-[370px] object-contain mb-2"
              />
              <div className="flex items-center space-x-2">
                <FaFacebookF size={32} className="text-white" />
                <span className="text-white font-bold uppercase">Facebook</span>
              </div>
            </div>
          </Link>
          {/* TikTok */}
          <Link
            href="https://www.tiktok.com/@SunnyIslandPepper"
            target="_blank"
            className="block"
          >
            <div className="rounded-lg p-3 flex flex-col items-center justify-center transition transform duration-300 hover:scale-105 hover:brightness-110 bg-white shadow-[0px_20px_20px_-17px_rgba(255,255,255,0.5)] hover:shadow-[0px_20px_35px_-16px_rgba(255,255,255,0.57)]">
              <img
                src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandTikTok.webp"
                alt="TikTok"
                className="w-[370px] h-[370px] object-contain mb-2"
              />
              <div className="flex items-center space-x-2">
                <FaTiktok size={32} className="text-black" />
                <span className="text-black font-bold uppercase">TikTok</span>
              </div>
            </div>
          </Link>

          {/* Instagram */}
          <Link
            href="https://www.instagram.com/SunnyIslandPepper"
            target="_blank"
            className="block"
          >
            <div className="rounded-lg p-3 flex flex-col items-center justify-center transition transform duration-300 hover:scale-105 hover:brightness-110 bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] shadow-[0px_20px_20px_-17px_rgba(255,16,39,0.5)] hover:shadow-[0px_20px_35px_-16px_rgba(255,16,39,0.57)]">
              <img
                src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandInstagram.webp"
                alt="Instagram"
                className="w-[370px] h-[370px] object-contain mb-2"
              />
              <div className="flex items-center space-x-2">
                <FaInstagram size={32} className="text-white" />
                <span className="text-white font-bold uppercase">
                  Instagram
                </span>
              </div>
            </div>
          </Link>

          {/* X */}
          <Link
            href="https://x.com/SunnyIslandPepper"
            target="_blank"
            className="block"
          >
            <div className="rounded-lg p-3 flex flex-col items-center justify-center transition transform duration-300 hover:scale-105 hover:brightness-110 bg-white shadow-[0px_20px_20px_-17px_rgba(255,255,255,0.5)] hover:shadow-[0px_20px_35px_-16px_rgba(255,255,255,0.57)]">
              <img
                src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandX.webp"
                alt="X"
                className="w-[370px] h-[370px] object-contain mb-2"
              />
              <div className="flex items-center space-x-2">
                <FaXTwitter size={32} className="text-black" />
                <span className="text-black font-bold uppercase">X</span>
              </div>
            </div>
          </Link>

          {/* YouTube */}
          <Link
            href="https://www.youtube.com/SunnyIslandPepper"
            target="_blank"
            className="block"
          >
            <div className="rounded-lg p-3 flex flex-col items-center justify-center transition transform duration-300 hover:scale-105 hover:brightness-110 bg-gradient-to-r from-[#ff1027] to-[#ff4f06] shadow-[0px_20px_20px_-17px_rgba(255,16,39,0.5)] hover:shadow-[0px_20px_35px_-16px_rgba(255,16,39,0.57)]">
              <img
                src="https://sunnyisland.s3.us-east-2.amazonaws.com/media/images/home/social/SunnyIslandYoutube.webp"
                alt="YouTube"
                className="w-[370px] h-[370px] object-contain mb-2"
              />
              <div className="flex items-center space-x-2">
                <FaYoutube size={32} className="text-white" />
                <span className="text-white font-bold uppercase">YouTube</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
