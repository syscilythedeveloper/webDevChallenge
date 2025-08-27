"use client";
import Image from "next/image";
import appLogo from "../../../public/appLogo.png";

const labels = [
  { name: "Concerns", emoji: "🎯" },
  { name: "Ingredients", emoji: "🧪" },
  { name: "AI Analysis", emoji: "🤖" },
];

export default function SkinCareAi() {
  return (
    <nav
      className="
         
        backdrop-blur-xl
        bg-[#F0FCE8]/70
      
        border-b border-[#A3B18A]/25
        shadow-[0_8px_30px_rgba(58,90,64,0.08)]
      "
    >
      <div className="flex h-16 items-center justify-between gap-5 pl-10 pr-10">
        {/* Brand */}
        <div
          role="img"
          aria-label="SkinCare.ai home"
          className="flex items-center gap-3"
        >
          <Image
            src={appLogo}
            alt="SkinCare.ai"
            className="h-10 w-10"
          />
          <div className="leading-5">
            <div className="text-xl font-bold">
              <span className="bg-gradient-to-r from-[#3A5A40] to-[#A3B18A] bg-clip-text text-transparent">
                Skin
              </span>
              <span className="bg-gradient-to-r from-[#A3B18A] to-[#3A5A40] bg-clip-text text-transparent">
                Care
              </span>
              <span className="text-[#6B8E6B] text-lg font-medium">.ai</span>
            </div>
            <div className="text-[11px] text-[#627A62] font-medium tracking-wide">
              Smarter skincare starts with ingredients. Shop by science, not
              hype.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[#EFFAE6] p-1 ring-1 ring-[#A3B18A]/20 shadow-[inset_0_1px_0_rgba(163,177,138,0.10)]">
            <ul className="flex items-center gap-1.5">
              {labels.map(({ name, emoji }) => (
                <li key={name}>
                  <div
                    className="
                      group select-none
                      inline-flex items-center gap-1.5
                      rounded-full px-3.5 py-1.5
                      text-sm text-[#2F3E2F]
                      bg-[#F1FCE8] ring-1 ring-[#A3B18A]/30
                      hover:bg-[#394f2856] hover:ring-[#A3B18A]/40
                      transition-all duration-200
                      hover:-translate-y-[1px]
                      shadow-[0_0_0_0_rgba(0,0,0,0)]
                      hover:shadow-[0_6px_20px_-6px_rgba(58,90,64,0.25)]
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A3B18A]/50
                    "
                    role="status"
                    aria-label={`${name} feature`}
                  >
                    <span
                      className="text-base"
                      aria-hidden="true"
                    >
                      {emoji}
                    </span>
                    <span className="tracking-wide">{name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
