import { useQuery } from "@tanstack/react-query";
import type { ContactInfo, Doctor, HospitalInfo, Service } from "../backend.d";
import { useActor } from "./useActor";

const FALLBACK_DOCTORS: Doctor[] = [
  {
    name: "डॉ. सुभाष कुमार सिंह",
    qualification: "M.B.B.S., DCH (AMU Aligarh)",
    specialization: "नवजात शिशु एवं बच्चा रोग विशेषज्ञ",
  },
  {
    name: "डॉ. रमन कुमार",
    qualification: "M.B.B.S., MD (Medicine, CMC Ludhiana)",
    specialization: "फिजीशियन",
  },
  {
    name: "डॉ. श्याम किशोर",
    qualification: "M.B.B.S., MD, DNB (AIIMS Delhi)",
    specialization: "फिजीशियन",
  },
  {
    name: "डॉ. सावन कुमार",
    qualification: "M.B.B.S., MD (Gen. Medicine)",
    specialization: "फिजीशियन",
  },
  {
    name: "डॉ. प्रीतम कुमार",
    qualification: "M.B.B.S., MS (Gen. Surgery)",
    specialization: "जनरल एवं लैप्रोस्कॉपिक सर्जन",
  },
  {
    name: "डॉ. पिंकी",
    qualification: "M.B.B.S., MS (Gen. Surgery)",
    specialization: "जनरल एवं लैप्रोस्कॉपिक सर्जन",
  },
  {
    name: "डॉ. प्रियंका कुमारी",
    qualification: "M.B.B.S., MS (OBG)",
    specialization: "स्त्री रोग विशेषज्ञ",
  },
  {
    name: "डॉ. संदीप आनंद",
    qualification: "M.B.B.S., MS (Ortho, PMCH)",
    specialization: "हड्डी रोग विशेषज्ञ",
  },
  {
    name: "डॉ. विकास कुमार",
    qualification: "M.B.B.S., DA",
    specialization: "एनेस्थीसिया व क्रिटिकल केयर",
  },
];

const FALLBACK_SERVICES: Service[] = [
  { name: "NICU", description: "नवजात गहन देखभाल इकाई" },
  { name: "PICU", description: "बाल गहन देखभाल इकाई" },
  { name: "ICU", description: "गहन देखभाल इकाई" },
  { name: "वेंटिलेटर सुविधा", description: "श्वास सहायता प्रणाली" },
  { name: "इमरजेंसी सेवा", description: "24×7 आपातकालीन सेवा उपलब्ध" },
  { name: "OT", description: "ऑपरेशन थिएटर" },
  { name: "पैथोलॉजी / लैब", description: "रक्त एवं अन्य जांच सेवाएं" },
  { name: "X-Ray", description: "डिजिटल रेडियोग्राफी सुविधा" },
];

const FALLBACK_HOSPITAL_INFO: HospitalInfo = {
  name: "Asha Hospital",
  tagline: "आपके स्वास्थ्य का भरोसेमंद केंद्र",
  description:
    "Asha Hospital पूर्णिया का एक प्रतिष्ठित मल्टी-स्पेशलिटी हॉस्पिटल है, जो NICU, PICU, ICU और वेंटिलेटर जैसी आधुनिक सुविधाओं से सुसज्जित है। अनुभवी डॉक्टरों की टीम, आधुनिक उपकरण और 24×7 इमरजेंसी सेवाओं के साथ यह हॉस्पिटल नवजात बच्चों से लेकर वरिष्ठ नागरिकों तक की देखभाल में समर्पित है।",
  address: "Asha Hospital, Purnia, Bihar",
};

const FALLBACK_CONTACT_INFO: ContactInfo = {
  hospitalPhone: "8405967314",
  whatsapp: "918405967314",
  ambulance: "108",
  opdTimings: "सुबह 9 बजे से शाम 4 बजे तक",
  mapLink: "https://maps.google.com/?q=Asha+Hospital+Purnia+Bihar",
};

const FALLBACK_WHY_CHOOSE: string[] = [
  "अनुभवी डॉक्टर",
  "अत्याधुनिक मशीनें",
  "साफ-सुथरा और सुरक्षित माहौल",
  "बच्चों के लिए विशेष NICU और PICU सुविधा",
  "24 घंटे इमरजेंसी सेवा उपलब्ध",
];

export function useGetDoctors() {
  const { actor, isFetching } = useActor();
  return useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return FALLBACK_DOCTORS;
      const result = await actor.getDoctors();
      return result.length > 0 ? result : FALLBACK_DOCTORS;
    },
    enabled: !!actor && !isFetching,
    placeholderData: FALLBACK_DOCTORS,
  });
}

export function useGetServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return FALLBACK_SERVICES;
      const result = await actor.getServices();
      return result.length > 0 ? result : FALLBACK_SERVICES;
    },
    enabled: !!actor && !isFetching,
    placeholderData: FALLBACK_SERVICES,
  });
}

export function useGetHospitalInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<HospitalInfo>({
    queryKey: ["hospitalInfo"],
    queryFn: async () => {
      if (!actor) return FALLBACK_HOSPITAL_INFO;
      return actor.getHospitalInfo();
    },
    enabled: !!actor && !isFetching,
    placeholderData: FALLBACK_HOSPITAL_INFO,
  });
}

export function useGetContactInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor) return FALLBACK_CONTACT_INFO;
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
    placeholderData: FALLBACK_CONTACT_INFO,
  });
}

export function useGetWhyChooseUs() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["whyChooseUs"],
    queryFn: async () => {
      if (!actor) return FALLBACK_WHY_CHOOSE;
      const result = await actor.getWhyChooseUs();
      return result.length > 0 ? result : FALLBACK_WHY_CHOOSE;
    },
    enabled: !!actor && !isFetching,
    placeholderData: FALLBACK_WHY_CHOOSE,
  });
}
