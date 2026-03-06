import { Activity, CalendarDays, Home, Phone, Stethoscope } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ContactPage } from "./pages/ContactPage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { HomePage } from "./pages/HomePage";
import { OpdPage } from "./pages/OpdPage";
import { ServicesPage } from "./pages/ServicesPage";

type Tab = "home" | "doctors" | "services" | "contact" | "opd";

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ReactNode;
  ocid: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "होम",
    icon: <Home size={20} strokeWidth={2} />,
    ocid: "nav.home.tab",
  },
  {
    id: "doctors",
    label: "डॉक्टर",
    icon: <Stethoscope size={20} strokeWidth={2} />,
    ocid: "nav.doctors.tab",
  },
  {
    id: "services",
    label: "सेवाएं",
    icon: <Activity size={20} strokeWidth={2} />,
    ocid: "nav.services.tab",
  },
  {
    id: "contact",
    label: "संपर्क",
    icon: <Phone size={20} strokeWidth={2} />,
    ocid: "nav.contact.tab",
  },
  {
    id: "opd",
    label: "OPD",
    icon: <CalendarDays size={20} strokeWidth={2} />,
    ocid: "nav.opd.tab",
  },
];

const PAGE_ORDER: Tab[] = ["home", "doctors", "services", "contact", "opd"];

function getPageTransition(prev: Tab, next: Tab) {
  const prevIdx = PAGE_ORDER.indexOf(prev);
  const nextIdx = PAGE_ORDER.indexOf(next);
  const dir = nextIdx > prevIdx ? 1 : -1;
  return {
    initial: { x: dir * 40, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -dir * 40, opacity: 0 },
    transition: { duration: 0.25, ease: "easeInOut" as const },
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [prevTab, setPrevTab] = useState<Tab>("home");

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const anim = getPageTransition(prevTab, activeTab);

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "doctors":
        return <DoctorsPage />;
      case "services":
        return <ServicesPage />;
      case "contact":
        return <ContactPage />;
      case "opd":
        return <OpdPage />;
    }
  };

  return (
    <div className="flex flex-col h-dvh max-h-dvh overflow-hidden">
      {/* Page Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={anim.initial}
            animate={anim.animate}
            exit={anim.exit}
            transition={anim.transition}
            className="absolute inset-0 overflow-y-auto"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <nav
        className="shrink-0 bg-card border-t border-border bottom-nav-safe"
        aria-label="मुख्य नेविगेशन"
      >
        <div className="flex items-stretch">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                data-ocid={item.ocid}
                onClick={() => handleTabChange(item.id)}
                className={`
                  flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1
                  transition-colors duration-200 relative min-h-[56px]
                  ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                `}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon with scale animation */}
                <motion.div
                  animate={{ scale: isActive ? 1.12 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {item.icon}
                </motion.div>

                <span
                  className={`text-[10px] font-semibold leading-none font-devanagari ${isActive ? "text-primary" : ""}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
