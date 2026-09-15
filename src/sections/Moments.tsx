import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";

interface PhotoItem {
  src: string;
  title: string;
  subtitle: string;
  span?: string;
}

const photos: PhotoItem[] = [
  {
    src: "/assets/couple-photo-3.jpg",
    title: "Draped in Celebration",
    subtitle: "A breezy afternoon where two souls walk hand in hand",
    span: "sm:col-span-2",
  },
  {
    src: "/assets/couple-photo-1.jpg",
    title: "Back to Back, Heart to Heart",
    subtitle: "Our favorite spot, laughter, and endless conversations",
    span: "sm:col-span-2",
  },
  {
    src: "/assets/couple-photo-2.jpg",
    title: "Gentle Laughter",
    subtitle: "Underneath old garden boughs sharing sweet smiles",
  },
  {
    src: "/assets/couple-photo-4.jpg",
    title: "Story of Us",
    subtitle: "From cherished pages to our forever journey",
  },
];

export default function Moments() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <SectionHeading kicker="Glimpses of Love" title="Moments of Togetherness" />

      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-8 text-center">
          <p className="font-display text-base italic tracking-wide text-[#f3e7d3]/75">
            “Every picture tells a story of our smiles, our journey, and the love that brought us here.”
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={i * 0.1}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[#d9a441]/30 bg-[#24080e]/60 shadow-[0_12px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-500 hover:border-[#d9a441]/70 hover:shadow-[0_16px_40px_rgba(217,164,65,0.25)] ${photo.span ?? ""}`}
            >
              <div
                onClick={() => setSelectedPhoto(photo)}
                className="relative flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160408] via-transparent to-transparent opacity-80" />
                  
                  {/* Subtle hover icon */}
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#d9a441]/40 bg-[#160408]/80 text-[#e8c874] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <Sparkles size={14} />
                  </div>
                </div>

                <div className="relative p-4">
                  <div className="flex items-center gap-2">
                    <Heart size={13} className="text-[#d9a441] fill-[#d9a441]/30" />
                    <h4 className="font-display text-base text-[#f6e2ae] tracking-wide">
                      {photo.title}
                    </h4>
                  </div>
                  <p className="mt-1 text-[12px] text-[#f3e7d3]/65 leading-relaxed">
                    {photo.subtitle}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox view */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] max-w-lg overflow-hidden rounded-2xl border border-[#d9a441]/50 bg-[#1f060b] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-[#f6e2ae] backdrop-blur-sm transition-transform active:scale-90"
              >
                <X size={18} />
              </button>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-full rounded-xl object-contain"
              />
              <div className="p-4 text-center">
                <h4 className="font-display text-lg text-[#f6e2ae]">{selectedPhoto.title}</h4>
                <p className="mt-1 text-xs text-[#f3e7d3]/70">{selectedPhoto.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
