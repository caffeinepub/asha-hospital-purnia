import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import {
  useGetContactInfo,
  useGetHospitalInfo,
  useGetWhyChooseUs,
} from "../hooks/useQueries";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const GALLERY_IMAGES = [
  {
    src: "/assets/uploads/image-1.png",
    alt: "NICU वार्ड – फोटोथेरेपी में नवजात शिशु",
  },
  { src: "/assets/uploads/image-1-2.png", alt: "हॉस्पिटल बैनर – सभी डॉक्टर" },
  { src: "/assets/uploads/image-2-3.png", alt: "NICU वार्ड" },
  { src: "/assets/uploads/image-3-4.png", alt: "मेडिकल उपकरण / वेंटिलेटर" },
  { src: "/assets/uploads/image-4-5.png", alt: "NICU वार्ड – विस्तृत दृश्य" },
  { src: "/assets/uploads/image-5-6.png", alt: "NICU फोटोथेरेपी" },
  { src: "/assets/uploads/image-6-7.png", alt: "इनक्यूबेटर में बच्चा – फोटोथेरेपी" },
  { src: "/assets/uploads/image-7-8.png", alt: "हॉस्पिटल बैनर – डॉक्टर सूची" },
  { src: "/assets/uploads/image-8-9.png", alt: "बाल वार्ड – बच्चा मरीज" },
  { src: "/assets/uploads/image-9-10.png", alt: "मेडिकल उपकरण – क्लोज़-अप" },
  { src: "/assets/uploads/image-10-11.png", alt: "NICU – फोटोथेरेपी लाइट्स" },
  { src: "/assets/uploads/image-11-12.png", alt: "वार्मर में बच्चा" },
  { src: "/assets/uploads/image-12-13.png", alt: "NICU – विस्तृत दृश्य" },
  { src: "/assets/uploads/image-13-14.png", alt: "NICU फोटोथेरेपी – क्लोज़-अप" },
  { src: "/assets/uploads/image-14-16.png", alt: "NICU वार्ड" },
  { src: "/assets/uploads/image-15-15.png", alt: "फोटोथेरेपी में बच्चा" },
  { src: "/assets/uploads/image-16-17.png", alt: "NICU वार्ड" },
  { src: "/assets/uploads/image-17-18.png", alt: "NICU वार्ड" },
  { src: "/assets/uploads/image-18-19.png", alt: "NICU वार्ड" },
  { src: "/assets/uploads/image-19-20.png", alt: "NICU वार्ड" },
  { src: "/assets/uploads/image-20-21.png", alt: "NICU वार्ड" },
];

const SPECIALTY_CHIPS = [
  "NICU",
  "PICU",
  "ICU",
  "वेंटिलेटर",
  "24×7 इमरजेंसी",
  "लेप्रोस्कॉपिक सर्जरी",
];

export function HomePage() {
  const { data: hospitalInfo, isLoading: infoLoading } = useGetHospitalInfo();
  useGetContactInfo(); // pre-fetch for other pages
  const { data: whyChoose, isLoading: whyLoading } = useGetWhyChooseUs();

  const isLoading = infoLoading;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex(
      (i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % GALLERY_IMAGES.length);
  }, []);

  return (
    <main className="flex flex-col flex-1 overflow-y-auto">
      {/* ─── Hero ─── */}
      <div className="hero-pattern bg-gradient-to-br from-primary via-primary to-accent px-5 pt-10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white/20 rounded-2xl shrink-0">
              <HeartPulse size={28} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-white leading-tight tracking-tight">
                Asha Hospital
              </h1>
              <p className="text-white/75 text-xs font-body mt-0.5">
                Purnia, Bihar
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 mb-5 border border-white/20"
          >
            <p className="text-white font-semibold text-base font-devanagari leading-snug">
              {hospitalInfo?.tagline ?? "आपके स्वास्थ्य का भरोसेमंद केंद्र"}
            </p>
          </motion.div>

          {/* Specialty chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.35 }}
            className="flex flex-wrap gap-2"
          >
            {SPECIALTY_CHIPS.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full border border-white/25 font-devanagari"
              >
                <Star size={9} className="fill-white/80 text-white/80" />
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Emergency Banner ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.35 }}
        className="mx-4 -mt-4 z-10 relative"
        data-ocid="home.emergency.banner"
      >
        <div className="bg-emergency text-emergency-foreground rounded-2xl px-4 py-3 flex items-center gap-3 shadow-btn-emergency pulse-emergency">
          <div className="p-2 bg-white/20 rounded-xl shrink-0">
            <Phone size={18} strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm font-devanagari leading-tight">
              24×7 इमरजेंसी सेवा उपलब्ध
            </p>
            <p className="text-[11px] opacity-90 mt-0.5 font-mono">
              📞 8405967314
            </p>
          </div>
          <ShieldCheck size={22} className="opacity-80 shrink-0" />
        </div>
      </motion.div>

      {/* ─── CTA Buttons ─── */}
      <section className="px-4 mt-4">
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            variants={itemVariants}
            href="tel:8405967314"
            data-ocid="home.call.primary_button"
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-primary text-primary-foreground rounded-2xl shadow-btn-primary font-semibold text-sm font-devanagari min-h-[88px] active:brightness-90 transition-all"
            aria-label="अभी कॉल करें"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <Phone size={22} strokeWidth={2} />
            </div>
            <span>अभी कॉल करें</span>
          </motion.a>

          <motion.a
            variants={itemVariants}
            href="https://wa.me/918405967314"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="home.whatsapp.primary_button"
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-whatsapp text-whatsapp-foreground rounded-2xl font-semibold text-sm font-devanagari min-h-[88px] active:brightness-90 transition-all shadow-md"
            aria-label="WhatsApp अपॉइंटमेंट"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <MessageCircle size={22} strokeWidth={2} />
            </div>
            <span>WhatsApp अपॉइंटमेंट</span>
          </motion.a>
        </motion.div>
      </section>

      {/* ─── About Section ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mx-4 mt-5"
      >
        <div className="bg-card rounded-2xl border border-border shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h2 className="font-display font-bold text-foreground text-base">
              हमारे बारे में
            </h2>
          </div>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed font-devanagari">
              {hospitalInfo?.description ??
                "Asha Hospital पूर्णिया का एक प्रतिष्ठित मल्टी-स्पेशलिटी हॉस्पिटल है।"}
            </p>
          )}
        </div>
      </motion.section>

      {/* ─── Founder Card ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mx-4 mt-4"
      >
        <div className="bg-gradient-to-br from-primary/8 to-accent/8 rounded-2xl border border-primary/15 p-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/12 flex items-center justify-center shrink-0 border border-primary/20">
              <span className="text-primary font-display font-bold text-xl">
                डॉ
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-display font-bold text-foreground text-base leading-tight font-devanagari">
                  डॉ. सुभाष कुमार सिंह
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                M.B.B.S., DCH (AMU Aligarh)
              </p>
              <p className="text-xs text-primary font-semibold mt-1 font-devanagari">
                नवजात शिशु एवं बच्चा रोग विशेषज्ञ
              </p>
              <span className="inline-flex items-center gap-1 mt-2 bg-primary/10 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full border border-primary/20 font-devanagari">
                <Star size={8} className="fill-primary text-primary" />
                संस्थापक – Asha Hospital
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-primary/15 flex items-center gap-2">
            <Phone size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-devanagari">
              OPD समय:{" "}
            </span>
            <span className="text-xs font-semibold text-foreground font-devanagari">
              सुबह 9 बजे – शाम 4 बजे
            </span>
          </div>
        </div>
      </motion.section>

      {/* ─── Why Choose Us ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mx-4 mt-4 mb-4"
      >
        <div className="bg-card rounded-2xl border border-border shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-accent rounded-full" />
            <h2 className="font-display font-bold text-foreground text-base">
              क्यों चुनें Asha Hospital?
            </h2>
          </div>

          {whyLoading ? (
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded-full shrink-0" />
                  <Skeleton className="h-3 flex-1" />
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2.5">
              {(whyChoose ?? []).map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-success shrink-0 mt-0.5"
                    strokeWidth={2.5}
                  />
                  <span className="text-sm text-foreground font-devanagari leading-relaxed">
                    {reason}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.section>

      {/* ─── Gallery ─── */}
      <motion.section
        data-ocid="gallery.section"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.4 }}
        className="mx-4 mt-4 mb-2"
      >
        <div className="bg-card rounded-2xl border border-border shadow-card p-4">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <Camera size={16} className="text-primary" />
            <h2 className="font-display font-bold text-foreground text-base font-devanagari">
              हमारी गैलरी
            </h2>
          </div>

          {/* 2-column masonry-style grid */}
          <div className="grid grid-cols-2 gap-2">
            {GALLERY_IMAGES.map((img, index) => (
              <motion.button
                key={img.src}
                data-ocid={`gallery.item.${index + 1}`}
                onClick={() => openLightbox(index)}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
                className="relative block w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 group"
                aria-label={`गैलरी तस्वीर ${index + 1}: ${img.alt}`}
              >
                <div
                  className={`w-full ${index % 5 === 1 ? "aspect-[3/4]" : index % 5 === 3 ? "aspect-[4/5]" : "aspect-square"}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-200 rounded-xl" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── Lightbox Dialog ─── */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          data-ocid="gallery.dialog"
          className="max-w-screen max-h-screen w-screen h-screen p-0 m-0 border-0 rounded-none bg-black/95 flex flex-col items-center justify-center"
          aria-describedby={undefined}
        >
          {/* Close button */}
          <Button
            data-ocid="gallery.close_button"
            variant="ghost"
            size="icon"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/25 text-white rounded-full w-10 h-10"
            aria-label="बंद करें"
          >
            <X size={20} />
          </Button>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white text-xs px-3 py-1 rounded-full font-mono">
            {activeIndex + 1} / {GALLERY_IMAGES.length}
          </div>

          {/* Main image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center w-full h-full px-16 py-16"
            >
              <img
                src={GALLERY_IMAGES[activeIndex].src}
                alt={GALLERY_IMAGES[activeIndex].alt}
                className="max-w-full max-h-full object-contain rounded-xl"
                style={{ maxHeight: "calc(100vh - 8rem)" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 text-center px-4">
            <p className="text-white/80 text-xs font-devanagari text-center max-w-xs">
              {GALLERY_IMAGES[activeIndex].alt}
            </p>
          </div>

          {/* Prev button */}
          <Button
            data-ocid="gallery.pagination_prev"
            variant="ghost"
            size="icon"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/25 text-white rounded-full w-11 h-11"
            aria-label="पिछली तस्वीर"
          >
            <ChevronLeft size={24} />
          </Button>

          {/* Next button */}
          <Button
            data-ocid="gallery.pagination_next"
            variant="ghost"
            size="icon"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/25 text-white rounded-full w-11 h-11"
            aria-label="अगली तस्वीर"
          >
            <ChevronRight size={24} />
          </Button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-0 right-0 z-50 flex justify-center">
            <div className="flex gap-1.5 overflow-x-auto max-w-[90vw] px-4 py-1 scrollbar-hide">
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  type="button"
                  key={img.src}
                  onClick={() => setActiveIndex(idx)}
                  className={`shrink-0 w-9 h-9 rounded-lg overflow-hidden transition-all ${
                    idx === activeIndex
                      ? "ring-2 ring-white ring-offset-1 ring-offset-black/50 opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`तस्वीर ${idx + 1} देखें`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Footer ─── */}
      <footer className="mt-auto px-4 pb-6 pt-2 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </main>
  );
}
