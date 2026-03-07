import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Info,
  Loader2,
  Stethoscope,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Appointment } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useGetDoctors } from "../hooks/useQueries";

const TIME_SLOTS = [
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
];

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

type OpdType = "normal" | "night";

interface FormState {
  patientName: string;
  phone: string;
  doctorName: string;
  appointmentDate: string;
  timeSlot: string;
  message: string;
  opdType: OpdType;
}

const INITIAL_FORM: FormState = {
  patientName: "",
  phone: "",
  doctorName: "",
  appointmentDate: "",
  timeSlot: "",
  message: "",
  opdType: "normal" as OpdType,
};

interface FieldError {
  patientName?: string;
  phone?: string;
  doctorName?: string;
  appointmentDate?: string;
  timeSlot?: string;
}

const OPD_FEES: Record<OpdType, number> = {
  normal: 600,
  night: 1000,
};

function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.patientName.trim()) errors.patientName = "मरीज का नाम आवश्यक है";
  if (!form.phone.trim()) {
    errors.phone = "मोबाइल नंबर आवश्यक है";
  } else if (!/^\d{10}$/.test(form.phone.trim())) {
    errors.phone = "10 अंकों का मोबाइल नंबर दर्ज करें";
  }
  if (!form.doctorName) errors.doctorName = "डॉक्टर चुनना आवश्यक है";
  if (!form.appointmentDate) errors.appointmentDate = "तारीख चुनना आवश्यक है";
  if (!form.timeSlot) errors.timeSlot = "समय स्लॉट चुनना आवश्यक है";
  return errors;
}

function UpiCopyCard({ opdType }: { opdType: OpdType }) {
  const [copied, setCopied] = useState(false);
  const fee = OPD_FEES[opdType];
  const isNight = opdType === "night";
  const colorClass = isNight
    ? {
        border: "border-indigo-200",
        bg: "bg-gradient-to-br from-indigo-50 to-purple-50",
        iconBg: "bg-indigo-100",
        icon: "text-indigo-600",
        label: "text-indigo-800",
        sub: "text-indigo-700",
        upiBorder: "border-indigo-100",
        upiLabel: "text-indigo-600",
        upiVal: "text-indigo-900",
        copyBtn: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
      }
    : {
        border: "border-sky-200",
        bg: "bg-gradient-to-br from-sky-50 to-teal-50",
        iconBg: "bg-sky-100",
        icon: "text-sky-600",
        label: "text-sky-800",
        sub: "text-sky-700",
        upiBorder: "border-sky-100",
        upiLabel: "text-sky-600",
        upiVal: "text-sky-900",
        copyBtn: "bg-sky-100 hover:bg-sky-200 text-sky-700",
      };

  const handleCopy = () => {
    navigator.clipboard.writeText("ashahosp@upi").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-2xl border p-4 mb-5 shadow-sm ${colorClass.border} ${colorClass.bg}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${colorClass.iconBg}`}
        >
          <CreditCard size={16} className={colorClass.icon} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Info size={13} className={`shrink-0 ${colorClass.icon}`} />
            <p
              className={`text-sm font-bold font-devanagari ${colorClass.label}`}
            >
              शुल्क हॉस्पिटल में जमा करें
            </p>
          </div>
          <p className={`text-xs font-devanagari mb-2.5 ${colorClass.sub}`}>
            OPD शुल्क: <span className="font-bold text-base">₹{fee}</span>
            &nbsp;|&nbsp;
            {isNight ? (
              <span className={`font-semibold ${colorClass.icon}`}>
                नाइट OPD (रात 8 बजे – सुबह 8 बजे)
              </span>
            ) : (
              <span>समय: सुबह 7:00 – रात 7:00 बजे</span>
            )}
          </p>

          {/* UPI section */}
          <div
            className={`flex items-center gap-2 bg-white/70 rounded-xl px-3 py-2 border ${colorClass.upiBorder}`}
          >
            <span className={`text-xs font-semibold ${colorClass.upiLabel}`}>
              UPI ID:
            </span>
            <span
              className={`text-sm font-bold flex-1 font-mono ${colorClass.upiVal}`}
            >
              ashahosp@upi
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors text-xs font-semibold ${colorClass.copyBtn}`}
            >
              <Copy size={11} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SuccessScreen({
  appointment,
  onReset,
  opdType,
}: {
  appointment: Appointment;
  onReset: () => void;
  opdType: OpdType;
}) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      data-ocid="opd.success.panel"
      className="flex flex-col items-center text-center px-4 py-10 gap-4"
    >
      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 22,
          delay: 0.15,
        }}
        className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center"
      >
        <CheckCircle2 size={44} className="text-green-500" strokeWidth={1.8} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
      >
        <h2 className="text-xl font-display font-extrabold text-foreground tracking-tight font-devanagari">
          अपॉइंटमेंट बुक हो गया!
        </h2>
        <p className="text-muted-foreground text-sm mt-1 font-devanagari">
          आपकी अपॉइंटमेंट सफलतापूर्वक दर्ज हो गई
        </p>
      </motion.div>

      {/* Details card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
        className="w-full bg-card border border-border rounded-2xl shadow-card p-5 text-left space-y-3"
      >
        {/* Appointment ID */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <span className="text-xs text-muted-foreground font-devanagari">
            अपॉइंटमेंट नंबर
          </span>
          <span className="text-base font-bold text-primary font-mono">
            #{appointment.id.toString()}
          </span>
        </div>

        <div className="flex items-start gap-2.5">
          <Stethoscope size={15} className="text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] text-muted-foreground font-devanagari">
              डॉक्टर
            </p>
            <p className="text-sm font-semibold text-foreground font-devanagari">
              {appointment.doctorName}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <CalendarDays size={15} className="text-accent mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] text-muted-foreground font-devanagari">
              तारीख
            </p>
            <p className="text-sm font-semibold text-foreground">
              {appointment.appointmentDate}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock size={15} className="text-success mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] text-muted-foreground font-devanagari">
              समय स्लॉट
            </p>
            <p className="text-sm font-semibold text-foreground">
              {appointment.timeSlot}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-3 border-t border-border">
          <CreditCard
            size={15}
            className={`mt-0.5 shrink-0 ${opdType === "night" ? "text-indigo-500" : "text-sky-500"}`}
          />
          <div>
            <p className="text-[11px] text-muted-foreground font-devanagari">
              OPD शुल्क
            </p>
            <p
              className={`text-sm font-bold ${opdType === "night" ? "text-indigo-600" : "text-sky-600"}`}
            >
              ₹{OPD_FEES[opdType]} &nbsp;
              <span className="text-xs font-normal text-muted-foreground font-devanagari">
                ({opdType === "night" ? "नाइट OPD" : "नॉर्मल OPD"})
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Info note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.35 }}
        className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 w-full"
      >
        <Info size={14} className="text-amber-600 shrink-0" />
        <p className="text-xs text-amber-700 font-devanagari">
          हॉस्पिटल से confirmation call आएगा
        </p>
      </motion.div>

      {/* Reset button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="w-full"
      >
        <Button
          type="button"
          variant="outline"
          className="w-full font-devanagari"
          onClick={onReset}
          data-ocid="opd.new_booking.button"
        >
          नई अपॉइंटमेंट बुक करें
        </Button>
      </motion.div>
    </motion.div>
  );
}

export function OpdPage() {
  const { actor } = useActor();
  const { data: doctors, isLoading: doctorsLoading } = useGetDoctors();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldError>({});
  const [bookedAppointment, setBookedAppointment] =
    useState<Appointment | null>(null);

  const mutation = useMutation<Appointment, Error, FormState>({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.bookAppointment(
        data.patientName.trim(),
        data.phone.trim(),
        data.doctorName,
        data.appointmentDate,
        data.timeSlot,
        data.message.trim(),
      );
    },
    onSuccess: (appt) => {
      setBookedAppointment(appt);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    mutation.mutate(form);
  };

  const handleReset = () => {
    setBookedAppointment(null);
    setForm(INITIAL_FORM);
    setErrors({});
    mutation.reset();
  };

  return (
    <main className="flex flex-col flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent px-5 pt-8 pb-6 hero-pattern">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays size={20} className="text-white/80" strokeWidth={2} />
            <h2 className="font-display text-xl font-extrabold text-white tracking-tight">
              ऑनलाइन OPD अपॉइंटमेंट
            </h2>
          </div>
          <p className="text-white/75 text-sm font-devanagari">
            घर बैठे डॉक्टर से अपॉइंटमेंट लें
          </p>
        </motion.div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {bookedAppointment ? (
          <SuccessScreen
            key="success"
            appointment={bookedAppointment}
            onReset={handleReset}
            opdType={form.opdType}
          />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="px-4 pt-5 pb-8"
          >
            {/* OPD Type Selector */}
            <div className="mb-5">
              <p className="text-sm font-semibold font-devanagari mb-2.5">
                OPD का प्रकार चुनें <span className="text-destructive">*</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  data-ocid="opd.type.normal.toggle"
                  onClick={() => setForm((p) => ({ ...p, opdType: "normal" }))}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 py-4 px-2 transition-all font-devanagari ${
                    form.opdType === "normal"
                      ? "border-sky-500 bg-sky-50 text-sky-700 shadow-md scale-[1.02]"
                      : "border-border bg-card text-muted-foreground hover:border-sky-300"
                  }`}
                >
                  <span className="text-2xl">🏥</span>
                  <span className="text-sm font-bold text-center leading-tight">
                    OPD
                  </span>
                  <span
                    className={`text-base font-extrabold ${form.opdType === "normal" ? "text-sky-600" : "text-foreground"}`}
                  >
                    ₹600
                  </span>
                  <span className="text-[10px] opacity-70 text-center">
                    सुबह 7:00 – रात 7:00
                  </span>
                </button>
                <button
                  type="button"
                  data-ocid="opd.type.night.toggle"
                  onClick={() => setForm((p) => ({ ...p, opdType: "night" }))}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 py-4 px-2 transition-all font-devanagari ${
                    form.opdType === "night"
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md scale-[1.02]"
                      : "border-border bg-card text-muted-foreground hover:border-indigo-300"
                  }`}
                >
                  <span className="text-2xl">🌙</span>
                  <span className="text-sm font-bold text-center leading-tight">
                    नाइट OPD
                  </span>
                  <span
                    className={`text-base font-extrabold ${form.opdType === "night" ? "text-indigo-600" : "text-foreground"}`}
                  >
                    ₹1000
                  </span>
                  <span className="text-[10px] opacity-70 text-center">
                    रात 8 बजे – सुबह 8 बजे
                  </span>
                </button>
              </div>
            </div>

            {/* UPI / Payment info card */}
            <UpiCopyCard opdType={form.opdType} />

            {/* Booking form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Patient Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="opd-name"
                  className="text-sm font-semibold font-devanagari"
                >
                  मरीज का नाम <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="opd-name"
                  data-ocid="opd.name.input"
                  type="text"
                  placeholder="मरीज का नाम"
                  autoComplete="name"
                  value={form.patientName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, patientName: e.target.value }))
                  }
                  className={`font-devanagari ${errors.patientName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.patientName && (
                  <p className="text-xs text-destructive font-devanagari">
                    {errors.patientName}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="opd-phone"
                  className="text-sm font-semibold font-devanagari"
                >
                  मोबाइल नंबर <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="opd-phone"
                  data-ocid="opd.phone.input"
                  type="tel"
                  placeholder="मोबाइल नंबर"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      phone: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className={
                    errors.phone
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {errors.phone && (
                  <p className="text-xs text-destructive font-devanagari">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Doctor Select */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold font-devanagari">
                  डॉक्टर चुनें <span className="text-destructive">*</span>
                </Label>
                {doctorsLoading ? (
                  <Skeleton className="h-10 w-full rounded-lg" />
                ) : (
                  <Select
                    value={form.doctorName}
                    onValueChange={(val) =>
                      setForm((p) => ({ ...p, doctorName: val }))
                    }
                  >
                    <SelectTrigger
                      data-ocid="opd.doctor.select"
                      className={`font-devanagari ${errors.doctorName ? "border-destructive" : ""}`}
                    >
                      <SelectValue placeholder="डॉक्टर चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      {(doctors ?? []).map((doc) => (
                        <SelectItem
                          key={doc.name}
                          value={doc.name}
                          className="font-devanagari"
                        >
                          {doc.name} — {doc.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {errors.doctorName && (
                  <p className="text-xs text-destructive font-devanagari">
                    {errors.doctorName}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="opd-date"
                  className="text-sm font-semibold font-devanagari"
                >
                  अपॉइंटमेंट की तारीख <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="opd-date"
                  data-ocid="opd.date.input"
                  type="date"
                  min={getTodayDate()}
                  value={form.appointmentDate}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      appointmentDate: e.target.value,
                    }))
                  }
                  className={
                    errors.appointmentDate
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {errors.appointmentDate && (
                  <p className="text-xs text-destructive font-devanagari">
                    {errors.appointmentDate}
                  </p>
                )}
              </div>

              {/* Time Slot */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold font-devanagari">
                  समय स्लॉट <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.timeSlot}
                  onValueChange={(val) =>
                    setForm((p) => ({ ...p, timeSlot: val }))
                  }
                >
                  <SelectTrigger
                    data-ocid="opd.timeslot.select"
                    className={errors.timeSlot ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="समय चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timeSlot && (
                  <p className="text-xs text-destructive font-devanagari">
                    {errors.timeSlot}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="opd-message"
                  className="text-sm font-semibold font-devanagari"
                >
                  समस्या / संदेश{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (वैकल्पिक)
                  </span>
                </Label>
                <Textarea
                  id="opd-message"
                  data-ocid="opd.message.textarea"
                  placeholder="समस्या लिखें (वैकल्पिक)"
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="font-devanagari resize-none"
                />
              </div>

              {/* Error state */}
              {mutation.isError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  data-ocid="opd.error_state"
                  className="flex items-center gap-2 bg-destructive/10 border border-destructive/25 rounded-xl px-4 py-3"
                >
                  <Info size={14} className="text-destructive shrink-0" />
                  <p className="text-xs text-destructive font-devanagari">
                    अपॉइंटमेंट बुक नहीं हो सकी। कृपया पुनः प्रयास करें।
                  </p>
                </motion.div>
              )}

              {/* Loading state indicator */}
              {mutation.isPending && (
                <div
                  data-ocid="opd.loading_state"
                  className="sr-only"
                  aria-live="polite"
                  aria-label="अपॉइंटमेंट बुक हो रही है"
                />
              )}

              {/* Submit */}
              <Button
                type="submit"
                data-ocid="opd.submit.button"
                disabled={mutation.isPending}
                className="w-full font-devanagari font-bold text-base h-12 mt-2"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    बुक हो रहा है…
                  </>
                ) : (
                  <>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    अपॉइंटमेंट बुक करें
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
