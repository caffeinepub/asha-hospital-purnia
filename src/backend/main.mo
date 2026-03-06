import Array "mo:core/Array";
import Migration "migration";

(with migration = Migration.run)
actor {
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

  var hospitalInfo : HospitalInfo = {
    name = "Asha Hospital";
    tagline = "Your Health, Our Priority";
    description = "Asha Hospital is a multi-specialty hospital in Purnia offering state-of-the-art medical facilities with a team of expert doctors.";
    address = "NH31; Gulabbagh | Purnia; Bihar 854326";
  };

  var doctors : [Doctor] = [
    {
      name = "Dr Amit Kumar";
      qualification = "MBBS; MD (Medicine)";
      specialization = "Internal Medicine";
    },
    {
      name = "Dr Saloni Verma";
      qualification = "MBBS; MS (Ortho)";
      specialization = "Orthopedics";
    },
  ];

  var services : [Service] = [
    {
      name = "Emergency Care";
      description = "24/7 emergency services with ICU and trauma support.";
    },
    {
      name = "Multi-Specialty OPD";
      description = "Departments for Medicine; Ortho; Gynaecology; Pediatrics; etc.";
    },
    {
      name = "Diagnostics";
      description = "Pathology; X-ray; Ultrasound; ECG; etc.";
    },
  ];

  var contactInfo : ContactInfo = {
    hospitalPhone = "9852043210";
    ambulance = "9854043210";
    whatsapp = "6287185927";
    mapLink = "https://maps.google.com/?q=Asha+Hospital+Purnia";
    opdTimings = "09:30 AM - 01:30 PM";
  };

  var whyChooseUs : [Text] = [
    "Highly qualified and experienced doctors",
    "Cutting-edge medical equipment",
    "Patient-centric approach",
    "Affordable treatment options",
    "Convenient location",
  ];

  public query ({ caller }) func getHospitalInfo() : async HospitalInfo {
    hospitalInfo;
  };

  public query ({ caller }) func getDoctors() : async [Doctor] {
    doctors;
  };

  public query ({ caller }) func getServices() : async [Service] {
    services;
  };

  public query ({ caller }) func getContactInfo() : async ContactInfo {
    contactInfo;
  };

  public query ({ caller }) func getWhyChooseUs() : async [Text] {
    whyChooseUs;
  };
};
