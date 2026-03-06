import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  Baby,
  FlaskConical,
  Heart,
  RadioTower,
  Scissors,
  ShieldAlert,
  Wind,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetServices } from "../hooks/useQueries";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

interface ServiceIconConfig {
  icon: React.ReactNode;
  bg: string;
}

const SERVICE_ICON_MAP: { match: string; config: ServiceIconConfig }[] = [
  {
    match: "NICU",
    config: {
      icon: <Baby size={20} strokeWidth={2} />,
      bg: "bg-sky-50 text-sky-600",
    },
  },
  {
    match: "PICU",
    config: {
      icon: <Baby size={20} strokeWidth={2} />,
      bg: "bg-indigo-50 text-indigo-600",
    },
  },
  {
    match: "ICU",
    config: {
      icon: <Heart size={20} strokeWidth={2} />,
      bg: "bg-red-50 text-red-500",
    },
  },
  {
    match: "वेंटिलेटर",
    config: {
      icon: <Wind size={20} strokeWidth={2} />,
      bg: "bg-teal-50 text-teal-600",
    },
  },
  {
    match: "इमरजेंसी",
    config: {
      icon: <Zap size={20} strokeWidth={2} />,
      bg: "bg-orange-50 text-orange-500",
    },
  },
  {
    match: "OT",
    config: {
      icon: <Scissors size={20} strokeWidth={2} />,
      bg: "bg-purple-50 text-purple-600",
    },
  },
  {
    match: "पैथोलॉजी",
    config: {
      icon: <FlaskConical size={20} strokeWidth={2} />,
      bg: "bg-emerald-50 text-emerald-600",
    },
  },
  {
    match: "X-Ray",
    config: {
      icon: <RadioTower size={20} strokeWidth={2} />,
      bg: "bg-slate-50 text-slate-600",
    },
  },
];

function getServiceIconConfig(name: string): ServiceIconConfig {
  for (const { match, config } of SERVICE_ICON_MAP) {
    if (name.includes(match)) return config;
  }
  return {
    icon: <Activity size={20} strokeWidth={2} />,
    bg: "bg-blue-50 text-blue-600",
  };
}

function ServiceSkeleton({ idx }: { idx: number }) {
  return (
    <div
      className="bg-card rounded-2xl p-4 shadow-card border border-border"
      data-ocid={idx === 0 ? "services.loading_state" : undefined}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
        <Skeleton className="w-8 h-8 rounded-xl" />
      </div>
    </div>
  );
}

export function ServicesPage() {
  const { data: services, isLoading, isError } = useGetServices();
  const displayServices = services ?? [];

  return (
    <main className="flex flex-col flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent to-primary px-5 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert size={20} className="text-white/80" strokeWidth={2} />
            <h2 className="font-display text-xl font-extrabold text-white tracking-tight">
              हमारी सेवाएं
            </h2>
          </div>
          <p className="text-white/70 text-sm font-devanagari">
            आधुनिक चिकित्सा सुविधाएं
          </p>
        </motion.div>
      </div>

      {/* Stats strip */}
      {!isLoading && displayServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mx-4 -mt-3 bg-card rounded-2xl shadow-card border border-border px-4 py-3 flex items-center gap-3"
        >
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-primary font-display">
              {displayServices.length}
            </p>
            <p className="text-xs text-muted-foreground font-devanagari">
              कुल सेवाएं
            </p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-success font-display">24×7</p>
            <p className="text-xs text-muted-foreground font-devanagari">
              इमरजेंसी
            </p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-accent font-display">ICU+</p>
            <p className="text-xs text-muted-foreground font-devanagari">
              गहन देखभाल
            </p>
          </div>
        </motion.div>
      )}

      {/* List */}
      <div className="px-4 py-4 space-y-3 pb-6" data-ocid="services.list">
        {isError && (
          <div
            className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 text-center"
            data-ocid="services.error_state"
          >
            <p className="text-sm text-destructive font-semibold font-devanagari">
              सेवाओं की सूची लोड नहीं हो सकी
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <ServiceSkeleton key={i} idx={i} />
            ))}
          </div>
        ) : displayServices.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="services.empty_state"
          >
            <div className="p-4 bg-muted rounded-2xl mb-4">
              <Activity size={32} className="text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground font-devanagari">
              कोई सेवा उपलब्ध नहीं
            </p>
          </div>
        ) : (
          <motion.div
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayServices.map((service, index) => {
              const ocid = `services.item.${index + 1}`;
              const { icon, bg } = getServiceIconConfig(service.name);
              return (
                <motion.div
                  key={`${service.name}-${index}`}
                  variants={itemVariants}
                  data-ocid={ocid}
                  className="bg-card rounded-2xl p-4 shadow-card border border-border card-lift"
                >
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${bg}`}
                    >
                      {icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-foreground text-sm leading-tight font-devanagari">
                        {service.name}
                      </p>
                      {service.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed font-devanagari">
                          {service.description}
                        </p>
                      )}
                    </div>

                    {/* Available indicator */}
                    <div className="w-2.5 h-2.5 rounded-full bg-success shrink-0 shadow-[0_0_6px_oklch(0.60_0.18_152/0.6)]" />
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
