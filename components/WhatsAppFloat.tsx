"use client";
import { wa } from "@/lib/site";
import { WaIcon } from "./icons";

export function WhatsAppFloat() {
  return (
    <a
      href={wa("Hi Eddie, I want an automated system for my business.")}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp Eddie"
      className="fixed bottom-[18px] right-[18px] z-[90] inline-flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-[18px] font-semibold text-white shadow-[0_12px_30px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
    >
      <WaIcon className="h-6 w-6" />
      <span className="hidden text-[0.9rem] sm:inline">WhatsApp me</span>
    </a>
  );
}
