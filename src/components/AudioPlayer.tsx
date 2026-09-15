import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Synthesized Indian Classical Wedding Ambient Drone & Shehnai/Flute melody
class WeddingAudioSynth {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;

  start() {
    if (this.isRunning) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Tanpura warm Sa-Pa drone (C#3 fundamental: ~138.6 Hz, Pa: ~207.65 Hz)
      const baseFreq = 138.59;
      const droneNotes = [baseFreq, baseFreq * 1.5, baseFreq * 2];

      droneNotes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
      });

      // Auspicious Raag Yaman notes (Sa, Re, Ga, Ma-tivra, Pa, Dha, Ni, Sa')
      const scale = [
        138.59 * 2, // Sa
        155.56 * 2, // Re
        174.61 * 2, // Ga
        196.00 * 2, // Ma (Tivra)
        207.65 * 2, // Pa
        233.08 * 2, // Dha
        261.63 * 2, // Ni
        277.18 * 2, // Sa'
      ];

      // Gentle melodic phrases
      const melodyPhrase = [
        0, 1, 2, 4, 3, 2, 1, 0,
        2, 4, 6, 7, 6, 4, 2, 0,
        4, 5, 4, 2, 1, 2, 0
      ];
      let step = 0;

      const playNote = () => {
        if (!this.ctx || !this.masterGain || !this.isRunning) return;
        const noteIdx = melodyPhrase[step % melodyPhrase.length];
        const freq = scale[noteIdx];
        step++;

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const noteFilter = this.ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Flute breath vibrato
        const vibrato = this.ctx.createOscillator();
        const vibratoGain = this.ctx.createGain();
        vibrato.frequency.setValueAtTime(5.2, this.ctx.currentTime);
        vibratoGain.gain.setValueAtTime(2.5, this.ctx.currentTime);
        vibrato.connect(osc.frequency);
        vibrato.start();

        noteFilter.type = "lowpass";
        noteFilter.frequency.setValueAtTime(800, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.07, now + 0.2);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

        osc.connect(noteFilter);
        noteFilter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 1.8);
        vibrato.stop(now + 1.8);
      };

      this.intervalId = window.setInterval(playNote, 1200);
      this.isRunning = true;
    } catch {
      // AudioContext unavailable
    }
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  get active() {
    return this.isRunning;
  }
}

const synth = new WeddingAudioSynth();

export default function AudioPlayer({ autoPlayTrigger }: { autoPlayTrigger?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(synth);

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      synthRef.current.start();
      setIsPlaying(true);
    }
  }, [autoPlayTrigger, isPlaying]);

  const toggleAudio = () => {
    if (isPlaying) {
      synthRef.current.stop();
      setIsPlaying(false);
    } else {
      synthRef.current.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="group flex items-center gap-2.5 rounded-full border border-[#d9a441]/50 bg-[#1e070c]/90 px-3.5 py-2.5 shadow-[0_4px_25px_rgba(217,164,65,0.3)] backdrop-blur-md transition-all duration-300 hover:border-[#d9a441] hover:scale-105 active:scale-95"
      >
        <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#d9a441]/20 text-[#e8c874]">
          {isPlaying ? (
            <Volume2 size={15} className="animate-pulse text-[#f6e2ae]" />
          ) : (
            <VolumeX size={15} className="text-[#f3e7d3]/60" />
          )}
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#e8c874]">
            {isPlaying ? "Celebration Melody" : "Play Music"}
          </span>
          <span className="text-[8px] tracking-wide text-[#f3e7d3]/50">
            {isPlaying ? "Raag Yaman · Shehnai & Flute" : "Click to listen"}
          </span>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-1">
            <span className="h-3 w-0.5 animate-[bounce_1s_infinite_100ms] rounded-full bg-[#d9a441]" />
            <span className="h-4 w-0.5 animate-[bounce_1s_infinite_300ms] rounded-full bg-[#e8c874]" />
            <span className="h-2 w-0.5 animate-[bounce_1s_infinite_200ms] rounded-full bg-[#d9a441]" />
          </div>
        )}
      </button>
    </div>
  );
}
