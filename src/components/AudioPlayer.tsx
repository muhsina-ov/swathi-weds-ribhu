import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer({ autoPlayTrigger }: { autoPlayTrigger?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio instance
    const audio = new Audio("/assets/shubhaarambh.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy prevented immediate playback; user can click toggle
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute background music" : "Play Shubhaarambh background music"}
        className="group flex items-center gap-2.5 rounded-full border border-[#d9a441]/50 bg-[#1e070c]/90 px-3.5 py-2.5 shadow-[0_4px_25px_rgba(217,164,65,0.3)] backdrop-blur-md transition-all duration-300 hover:border-[#d9a441] hover:scale-105 active:scale-95"
      >
        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#d9a441]/20 text-[#e8c874]">
          {isPlaying ? (
            <Volume2 size={16} className="animate-pulse text-[#f6e2ae]" />
          ) : (
            <VolumeX size={16} className="text-[#f3e7d3]/60" />
          )}
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#e8c874]">
            {isPlaying ? "Shubhaarambh" : "Play Music"}
          </span>
          <span className="text-[8px] tracking-wide text-[#f3e7d3]/50">
            {isPlaying ? "Kai Po Che · Instrumental" : "Click to play BGM"}
          </span>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-1">
            <span className="h-3 w-0.5 animate-[bounce_1s_infinite_100ms] rounded-full bg-[#d9a441]" />
            <span className="h-4 w-0.5 animate-[bounce_1s_infinite_300ms] rounded-full bg-[#e8c874]" />
            <span className="h-2.5 w-0.5 animate-[bounce_1s_infinite_200ms] rounded-full bg-[#d9a441]" />
          </div>
        )}
      </button>
    </div>
  );
}
