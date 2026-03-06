import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    name: string;
    description: string;
}
export interface Doctor {
    name: string;
    specialization: string;
    qualification: string;
}
export interface Appointment {
    id: bigint;
    status: string;
    appointmentDate: string;
    message: string;
    patientName: string;
    phone: string;
    doctorName: string;
    timeSlot: string;
}
export interface ContactInfo {
    mapLink: string;
    whatsapp: string;
    ambulance: string;
    hospitalPhone: string;
    opdTimings: string;
}
export interface HospitalInfo {
    tagline: string;
    name: string;
    description: string;
    address: string;
}
export interface backendInterface {
    bookAppointment(patientName: string, phone: string, doctorName: string, appointmentDate: string, timeSlot: string, message: string): Promise<Appointment>;
    getAppointmentById(id: bigint): Promise<Appointment | null>;
    getAppointments(): Promise<Array<Appointment>>;
    getContactInfo(): Promise<ContactInfo>;
    getDoctors(): Promise<Array<Doctor>>;
    getHospitalInfo(): Promise<HospitalInfo>;
    getServices(): Promise<Array<Service>>;
    getWhyChooseUs(): Promise<Array<string>>;
}
