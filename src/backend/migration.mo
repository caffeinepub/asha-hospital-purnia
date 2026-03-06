module {
  type OldActor = {
    doctors : [Doctor];
    services : [Service];
    hospitalContact : HospitalContact;
  };

  type Doctor = {
    name : Text;
    specialty : Text;
    opdTimings : Text;
    contact : Text;
  };

  type Service = {
    name : Text;
    status : Text;
  };

  type HospitalContact = {
    hospitalPhone : Text;
    ambulance : Text;
    whatsapp : Text;
    mapLink : Text;
  };

  type NewDoctor = {
    name : Text;
    qualification : Text;
    specialization : Text;
  };

  type HospitalInfo = {
    name : Text;
    tagline : Text;
    description : Text;
    address : Text;
  };

  type NewService = {
    name : Text;
    description : Text;
  };

  type ContactInfo = {
    hospitalPhone : Text;
    ambulance : Text;
    whatsapp : Text;
    mapLink : Text;
    opdTimings : Text;
  };

  type NewActor = {
    hospitalInfo : HospitalInfo;
    doctors : [NewDoctor];
    services : [NewService];
    contactInfo : ContactInfo;
    whyChooseUs : [Text];
  };

  public func run(old : OldActor) : NewActor {
    {
      hospitalInfo = {
        name = "Asha Hospital";
        tagline = "Your Health, Our Priority";
        description = "Asha Hospital is a multi-specialty hospital in Purnia offering state-of-the-art medical facilities with a team of expert doctors.";
        address = "NH31; Gulabbagh | Purnia; Bihar 854326";
      };

      doctors = [
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

      services = [
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

      contactInfo = {
        hospitalPhone = "9852043210";
        ambulance = "9854043210";
        whatsapp = "6287185927";
        mapLink = "https://maps.google.com/?q=Asha+Hospital+Purnia";
        opdTimings = "09:30 AM - 01:30 PM";
      };

      whyChooseUs = [
        "Highly qualified and experienced doctors",
        "Cutting-edge medical equipment",
        "Patient-centric approach",
        "Affordable treatment options",
        "Convenient location",
      ];
    };
  };
};
