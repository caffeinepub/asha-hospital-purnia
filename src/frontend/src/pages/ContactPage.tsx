import { Skeleton } from "@/components/ui/skeleton";
import {
  Ambulance,
  Building2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetContactInfo, useGetHospitalInfo } from "../hooks/useQueries";

function fadeInUp(i: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.1, duration: 0.38, ease: "easeOut" as const },
  };
}

export function ContactPage() {
  const { data: contact, isLoading } = useGetContactInfo();
  const { data: hospitalInfo } = useGetHospitalInfo();

  return (
    <main className="flex flex-col flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-location px-5 pt-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={20} className="text-white/80" strokeWidth={2} />
            <h2 className="font-display text-xl font-extrabold text-white tracking-tight">
              संपर्क करें
            </h2>
          </div>
          <p className="text-white/70 text-sm font-devanagari">
            हम आपकी सेवा में सदैव तत्पर हैं
          </p>
        </motion.div>
      </div>

      <div className="px-4 py-5 space-y-3 pb-6">
        {/* Hospital Info Card */}
        <motion.div
          {...fadeInUp(0)}
          className="bg-card rounded-2xl p-4 shadow-card border border-border"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-primary/10 rounded-2xl shrink-0">
              <Building2 size={22} className="text-primary" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-foreground text-base leading-tight">
                Asha Hospital, Purnia
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-devanagari">
                {hospitalInfo?.address ?? "Asha Hospital, Purnia, Bihar"}
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                <Clock size={12} className="text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground font-devanagari">
                  OPD: {contact?.opdTimings ?? "सुबह 9 बजे से शाम 4 बजे तक"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Buttons */}
        {isLoading ? (
          <div className="space-y-3" data-ocid="contact.loading_state">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-[76px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <>
            {/* Call 1 */}
            <motion.a
              {...fadeInUp(1)}
              href="tel:8405967314"
              data-ocid="contact.call1.primary_button"
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-primary text-primary-foreground shadow-btn-primary active:brightness-90 transition-all duration-200 hover:shadow-lg"
              aria-label="कॉल करें - 8405967314"
            >
              <div className="p-2.5 rounded-2xl bg-white/20 shrink-0">
                <Phone size={22} strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm font-devanagari">कॉल करें</p>
                <p className="text-xs opacity-85 mt-0.5 font-mono">
                  📞 8405967314
                </p>
              </div>
              <Phone size={16} className="opacity-60 shrink-0" />
            </motion.a>

            {/* Call 2 */}
            <motion.a
              {...fadeInUp(2)}
              href="tel:8434180017"
              data-ocid="contact.call2.primary_button"
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-accent text-accent-foreground shadow-md active:brightness-90 transition-all duration-200 hover:shadow-lg"
              aria-label="कॉल करें - 8434180017"
            >
              <div className="p-2.5 rounded-2xl bg-white/20 shrink-0">
                <Phone size={22} strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm font-devanagari">
                  वैकल्पिक नंबर
                </p>
                <p className="text-xs opacity-85 mt-0.5 font-mono">
                  📞 8434180017
                </p>
              </div>
              <Phone size={16} className="opacity-60 shrink-0" />
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              {...fadeInUp(3)}
              href={`https://wa.me/${contact?.whatsapp ?? "918405967314"}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.whatsapp.primary_button"
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-whatsapp text-whatsapp-foreground shadow-md active:brightness-90 transition-all duration-200 hover:shadow-lg"
              aria-label="WhatsApp अपॉइंटमेंट"
            >
              <div className="p-2.5 rounded-2xl bg-white/20 shrink-0">
                <MessageCircle size={22} strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm font-devanagari">
                  WhatsApp अपॉइंटमेंट
                </p>
                <p className="text-xs opacity-85 mt-0.5 font-devanagari">
                  संदेश भेजें
                </p>
              </div>
              <MessageCircle size={16} className="opacity-60 shrink-0" />
            </motion.a>

            {/* Emergency */}
            <motion.a
              {...fadeInUp(4)}
              href={`tel:${contact?.ambulance ?? "108"}`}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-emergency text-emergency-foreground shadow-btn-emergency active:brightness-90 transition-all duration-200 hover:shadow-lg pulse-emergency"
              aria-label="इमरजेंसी / एम्बुलेंस"
            >
              <div className="p-2.5 rounded-2xl bg-white/20 shrink-0">
                <Ambulance size={22} strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm font-devanagari">
                  इमरजेंसी / एम्बुलेंस
                </p>
                <p className="text-xs opacity-85 mt-0.5 font-devanagari">
                  24×7 उपलब्ध — डायल{" "}
                  <span className="font-bold font-mono">
                    {contact?.ambulance ?? "108"}
                  </span>
                </p>
              </div>
              <Ambulance size={16} className="opacity-60 shrink-0" />
            </motion.a>

            {/* Google Maps */}
            <motion.a
              {...fadeInUp(5)}
              href={
                contact?.mapLink ??
                "https://maps.google.com/?q=Asha+Hospital+Purnia+Bihar"
              }
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.maps.primary_button"
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-location text-location-foreground shadow-md active:brightness-90 transition-all duration-200 hover:shadow-lg"
              aria-label="Google Maps पर लोकेशन देखें"
            >
              <div className="p-2.5 rounded-2xl bg-white/20 shrink-0">
                <MapPin size={22} strokeWidth={2} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm font-devanagari">
                  लोकेशन देखें
                </p>
                <p className="text-xs opacity-85 mt-0.5 font-devanagari">
                  Google Maps पर खोलें
                </p>
              </div>
              <MapPin size={16} className="opacity-60 shrink-0" />
            </motion.a>
          </>
        )}

        {/* OPD Timing Info */}
        <motion.div
          {...fadeInUp(6)}
          className="bg-secondary/60 border border-border rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              OPD समय
            </p>
          </div>
          <p className="text-sm font-semibold text-foreground font-devanagari">
            {contact?.opdTimings ?? "सुबह 9 बजे से शाम 4 बजे तक"}
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-devanagari leading-relaxed">
            इमरजेंसी सेवा 24 घंटे, सातों दिन उपलब्ध है।
          </p>
        </motion.div>
      </div>

      {/* Footer */}
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
