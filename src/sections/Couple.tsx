import Reveal, { SectionHeading } from "../components/Reveal";
import Aurora from "../components/Aurora";
import { wedding } from "../config";

export default function Couple() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Aurora className="opacity-60" />
      <SectionHeading kicker="Two Hearts · One Love" title="The Happy Couple" />

      <div className="relative mx-auto flex max-w-md flex-col items-center">
        {/* illustration with glow */}
        <Reveal className="relative">
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
            style={{
              background:
                "radial-gradient(circle, rgba(217,164,65,0.35), transparent 70%)",
              animation: "glow-pulse 4s ease-in-out infinite",
            }}
          />
          <img
            src="/assets/couple.png"
            alt={`${wedding.brideFull} and ${wedding.groomFull}`}
            className="relative w-72 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] sm:w-80"
            style={{ animation: "float-soft 6s ease-in-out infinite" }}
          />
        </Reveal>

        {/* names + parents */}
        <div className="mt-10 grid w-full grid-cols-1 gap-8 text-center sm:grid-cols-2">
          <Reveal delay={0.1} className="flex flex-col gap-1">
            <h3 className="font-script text-gold text-4xl leading-[1.35] pt-2 pb-1 px-2">{wedding.groomFull}</h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#d9b36a]">The Groom</span>
            <p className="mt-1 text-[13px] leading-relaxed tracking-wide text-[#f3e7d3]/80 whitespace-pre-line">
              {wedding.groomParents}
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col gap-1">
            <h3 className="font-script text-gold text-4xl leading-[1.35] pt-2 pb-1 px-2">{wedding.brideFull}</h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#d9b36a]">The Bride</span>
            <p className="mt-1 text-[13px] leading-relaxed tracking-wide text-[#f3e7d3]/80 whitespace-pre-line">
              {wedding.brideParents}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
