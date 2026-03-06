import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";

module {
  public type Doctor = {
    name : Text;
    qualification : Text;
    specialization : Text;
  };

  public type HospitalInfo = {
    name : Text;
    tagline : Text;
    description : Text;
    address : Text;
  };

  public type Service = {
    name : Text;
    description : Text;
  };

  public type ContactInfo = {
    hospitalPhone : Text;
    ambulance : Text;
    whatsapp : Text;
    mapLink : Text;
    opdTimings : Text;
  };

  public type Appointment = {
    id : Nat;
    patientName : Text;
    phone : Text;
    doctorName : Text;
    appointmentDate : Text;
    timeSlot : Text;
    message : Text;
    status : Text;
  };

  public type OldActor = {
    hospitalInfo : HospitalInfo;
    doctors : [Doctor];
    services : [Service];
    contactInfo : ContactInfo;
    whyChooseUs : [Text];
  };

  public type NewActor = {
    hospitalInfo : HospitalInfo;
    doctors : [Doctor];
    services : [Service];
    contactInfo : ContactInfo;
    whyChooseUs : List.List<Text>;
    nextAppointmentId : Nat;
    appointments : Map.Map<Nat, Appointment>;
  };

  public func run(old : OldActor) : NewActor {
    {
      hospitalInfo = old.hospitalInfo;
      doctors = old.doctors;
      services = old.services;
      contactInfo = old.contactInfo;
      whyChooseUs = List.fromArray(old.whyChooseUs);
      appointments = Map.empty<Nat, Appointment>();
      nextAppointmentId = 1;
    };
  };
};
