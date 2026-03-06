import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle2,
  HeartPulse,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
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
