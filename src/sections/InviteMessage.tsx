import Reveal from "../components/Reveal";
import Countdown from "../components/Countdown";
import { wedding } from "../config";

export default function InviteMessage() {
  return (
    <section className="relative flex flex-col items-center gap-12 px-6 py-24">
      <Reveal className="flex max-w-lg flex-col items-center gap-6 text-center">
        <span className="font-display text-sm sm:text-base tracking-[0.2em] sm:tracking-[0.25em] text-[#d9b36a]">
          {wedding.verse.hindi}
        </span>
        <img src="/assets/mandala.png" alt="" className="w-16 opacity-70" />
        
        <div className="flex flex-col gap-6 font-display text-lg sm:text-xl leading-relaxed text-[#f3e7d3]/90">
          <p className="italic">
            <span className="font-display text-2xl sm:text-3xl text-gold not-italic block mb-1 font-semibold">
              Rinku &amp; Partha Pramanik
            </span>
            cordially invite you to grace the Wedding Reception<br />
            of their beloved son, <span className="text-[#f6e2ae] font-semibold not-italic">Ribhu</span>,<br />
            and <span className="text-[#f6e2ae] font-semibold not-italic">Swati</span>.
          </p>

          <p className="text-base sm:text-lg italic text-[#f3e7d3]/85">
            Join us as we celebrate their union,<br />
            bless the newlyweds,<br />
            and share in the joy of this beautiful beginning.
          </p>

          <p className="text-base sm:text-lg italic text-[#f3e7d3]/85">
            Your presence and blessings<br />
            will make this celebration truly special.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="flex flex-col items-center gap-6">
        <span className="text-[11px] uppercase tracking-[0.45em] text-[#d9b36a]">
          Counting down to the big day
        </span>
        <Countdown targetISO={wedding.dateISO} />
      </Reveal>
    </section>
  );
}
