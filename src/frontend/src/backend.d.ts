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
    getContactInfo(): Promise<ContactInfo>;
    getDoctors(): Promise<Array<Doctor>>;
    getHospitalInfo(): Promise<HospitalInfo>;
    getServices(): Promise<Array<Service>>;
    getWhyChooseUs(): Promise<Array<string>>;
}
