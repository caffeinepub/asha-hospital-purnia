import { Skeleton } from "@/components/ui/skeleton";
import { Stethoscope, User } from "lucide-react";
import { motion } from "motion/react";
import { useGetDoctors } from "../hooks/useQueries";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const SPEC_COLORS: { match: string; cls: string }[] = [
  {
    match: "नवजात",
    cls: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    match: "फिजीशियन",
    cls: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    match: "सर्जन",
    cls: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    match: "स्त्री",
    cls: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    match: "हड्डी",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    match: "एनेस्थीसिया",
    cls: "bg-teal-50 text-teal-700 border-teal-200",
  },
];

function getSpecColor(spec: string): string {
  for (const { match, cls } of SPEC_COLORS) {
    if (spec.includes(match)) return cls;
  }
  return "bg-muted text-muted-foreground border-border";
}

function DoctorCardSkeleton({ idx }: { idx: number }) {
  return (
    <div
      className="bg-card rounded-2xl p-4 shadow-card border border-border"
      data-ocid={idx === 0 ? "doctors.loading_state" : undefined}
    >
      <div className="flex gap-3">
        <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-6 w-2/5 rounded-full mt-1" />
        </div>
      </div>
    </div>
  );
}

export function DoctorsPage() {
  const { data: doctors, isLoading, isError } = useGetDoctors();

  const displayDoctors = doctors ?? [];

  return (
    <main className="flex flex-col flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent px-5 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Stethoscope size={20} className="text-white/80" strokeWidth={2} />
            <h2 className="font-display text-xl font-extrabold text-white tracking-tight">
              हमारे डॉक्टर
            </h2>
          </div>
          <p className="text-white/70 text-sm font-devanagari">
            अनुभवी विशेषज्ञों की टीम
          </p>
        </motion.div>
      </div>

      {/* Count badge */}
      {!isLoading && displayDoctors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mx-4 -mt-3 bg-card rounded-2xl shadow-card border border-border px-4 py-3 flex items-center gap-3"
        >
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-primary font-display">
              {displayDoctors.length}
            </p>
            <p className="text-xs text-muted-foreground font-devanagari">
              विशेषज्ञ डॉक्टर
            </p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-success font-display">24×7</p>
            <p className="text-xs text-muted-foreground font-devanagari">
              इमरजेंसी सेवा
            </p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-accent font-display">9+</p>
            <p className="text-xs text-muted-foreground font-devanagari">
              विभाग
            </p>
          </div>
        </motion.div>
      )}

      {/* List */}
      <div className="px-4 py-4 space-y-3 pb-6" data-ocid="doctors.list">
        {isError && (
          <div
            className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 text-center"
            data-ocid="doctors.error_state"
          >
            <p className="text-sm text-destructive font-semibold font-devanagari">
              डॉक्टरों की सूची लोड नहीं हो सकी
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-devanagari">
              कृपया पुनः प्रयास करें
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <DoctorCardSkeleton key={i} idx={i} />
            ))}
          </div>
        ) : displayDoctors.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="doctors.empty_state"
          >
            <div className="p-4 bg-muted rounded-2xl mb-4">
              <Stethoscope size={32} className="text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground font-devanagari">
              कोई डॉक्टर उपलब्ध नहीं
            </p>
          </div>
        ) : (
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayDoctors.map((doctor, index) => {
              const ocid = `doctors.item.${index + 1}`;
              return (
                <motion.div
                  key={`${doctor.name}-${index}`}
                  variants={itemVariants}
                  data-ocid={ocid}
                  className="bg-card rounded-2xl p-4 shadow-card border border-border card-lift"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/15">
                      <User
                        size={22}
                        className="text-primary"
                        strokeWidth={2}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-foreground text-base leading-tight font-devanagari">
                        {doctor.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 font-mono leading-relaxed">
                        {doctor.qualification}
                      </p>
                      <span
                        className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full border mt-1.5 font-devanagari ${getSpecColor(doctor.specialization)}`}
                      >
                        {doctor.specialization}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </main>
  );
}
