import { CalendarPlus, Navigation, MapPin } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding, googleCalendarUrl, downloadICS, mapsDirectionsUrl } from "../config";

export default function Venue() {
  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="Where & When" title="The Venue" />

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-[#f6e2ae]">{wedding.venue.name}</h3>
          <p className="flex items-center gap-2 text-[13px] text-[#f3e7d3]/70">
            <MapPin size={14} className="text-[#d9a441]" />
            {wedding.venue.address}
          </p>
        </Reveal>

        {/* map */}
        <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-[#d9a441]/30 bg-[#23070d] shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          {/* Subtle cartographic grid styling */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d9a441_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-20" />
          <iframe
            title="Wedding venue map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=88.4600%2C22.5750%2C88.4850%2C22.5950&layer=mapnik&marker=22.5852%2C88.4721"
            className="relative h-64 w-full grayscale-[25%] contrast-[1.05] sm:h-72"
            loading="lazy"
          />
          {/* Subtle venue badge over map */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-[#d9a441]/40 bg-[#160408]/90 p-2.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d9a441]/20 text-[#e8c874]">
                <MapPin size={14} />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold text-[#f6e2ae]">Swapno Bhor (Seniors' Park)</p>
                <p className="text-[9px] text-[#f3e7d3]/60">Action Area I, New Town, Kolkata</p>
              </div>
            </div>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#d9a441]/20 px-3 py-1 text-[10px] uppercase tracking-wider text-[#e8c874] hover:bg-[#d9a441]/30"
            >
              Open Maps
            </a>
          </div>
        </Reveal>

        {/* actions */}
        <Reveal delay={0.15} className="grid grid-cols-1 gap-3">
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#b9832e] via-[#e8c874] to-[#b9832e] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.25em] text-[#2b0a10] shadow-[0_8px_30px_rgba(217,164,65,0.35)] transition-transform active:scale-95"
          >
            <Navigation size={16} /> Get Directions
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-[#d9a441]/50 px-4 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f6e2ae] transition-colors hover:bg-[#d9a441]/10 active:scale-95"
            >
              <CalendarPlus size={15} /> Google Cal
            </a>
            <button
              onClick={downloadICS}
              className="flex items-center justify-center gap-2 rounded-full border border-[#d9a441]/50 px-4 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#f6e2ae] transition-colors hover:bg-[#d9a441]/10 active:scale-95"
            >
              <CalendarPlus size={15} /> Apple / ICS
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
