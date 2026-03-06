import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
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

  var nextAppointmentId = 1;

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
    {
      name = "Dr Chandan Kumar";
      qualification = "MBBS; DCH";
      specialization = "Pediatrics";
    },
    {
      name = "Dr Seema Singh";
      qualification = "MBBS; MD (Gynae)";
      specialization = "Gynecology & Obstetrics";
    },
    {
      name = "Dr Satya Prakash";
      qualification = "MBBS; MS (Ortho)";
      specialization = "Orthopedics";
    },
    {
      name = "Dr Shilpi Singhania";
      qualification = "MBBS; MD (Medicine)";
      specialization = "Internal Medicine";
    },
    {
      name = "Dr Pankaj Kumar";
      qualification = "MBBS; MS (Surgery)";
      specialization = "General Surgery";
    },
    {
      name = "Dr Asim Haque";
      qualification = "MBBS; MS (Surgery)";
      specialization = "General Surgery";
    },
    {
      name = "Dr Amit Raj";
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
      name = "ICU & Critical Care";
      description = "Fully equipped 12 bed ICU; ventilators and monitoring systems.";
    },
    {
      name = "Maternity Services";
      description = "24/7 delivery and pregnancy care with expert gynecologists.";
    },
    {
      name = "Surgery";
      description = "Laparoscopic; general; trauma and joint replacement surgeries.";
    },
    {
      name = "Diagnostics";
      description = "Pathology; X-ray; Ultrasound; ECG; etc.";
    },
    {
      name = "Medical Camps";
      description = "Regular camps for awareness and health check-ups.";
    },
  ];

  var contactInfo : ContactInfo = {
    hospitalPhone = "9852043210";
    ambulance = "9854043210";
    whatsapp = "6287185927";
    mapLink = "https://maps.google.com/?q=Asha+Hospital+Purnia";
    opdTimings = "09:30 AM - 01:30 PM";
  };

  var whyChooseUs : List.List<Text> = List.fromArray<Text>([
    "Highly qualified and experienced doctors",
    "Cutting-edge medical equipment",
    "Patient-centric approach",
    "Affordable treatment options",
    "Convenient location near Gulabbagh",
    "24/7 emergency and ambulance services",
    "State-of-the-art facilities",
    "Comprehensive range of specialties",
    "Experienced support staff",
    "Regular health camps & awareness programs",
  ]);

  let appointments = Map.empty<Nat, Appointment>();

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
    whyChooseUs.toArray();
  };

  public shared ({ caller }) func bookAppointment(patientName : Text, phone : Text, doctorName : Text, appointmentDate : Text, timeSlot : Text, message : Text) : async Appointment {
    let appointment : Appointment = {
      id = nextAppointmentId;
      patientName;
      phone;
      doctorName;
      appointmentDate;
      timeSlot;
      message;
      status = "pending";
    };
    appointments.add(nextAppointmentId, appointment);
    nextAppointmentId += 1;
    appointment;
  };

  public query ({ caller }) func getAppointments() : async [Appointment] {
    appointments.values().toArray();
  };

  public query ({ caller }) func getAppointmentById(id : Nat) : async ?Appointment {
    appointments.get(id);
  };
};
