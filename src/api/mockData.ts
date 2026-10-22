import { LayoutConfig } from '../types/config.types';
import { Doctor } from '../types/doctor.types';
import { Prescription } from '../types/prescription.types';
import { Slot } from '../types/booking.types';

export const NORMAL_LAYOUT_CONFIG: LayoutConfig = {
  version: 1,
  theme: {
    primary: '#0F766E', // Calming Deep Teal
    secondary: '#14B8A6', // Vibrant Teal
    background: '#F8FAFC', // Slate soft grey-white
    surface: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    accent: '#0284C7',
  },
  tabs: [
    { id: 'tab-home', label: 'Home', icon: 'home', screen: 'home' },
    { id: 'tab-bookings', label: 'Appointments', icon: 'calendar', screen: 'bookings' },
    { id: 'tab-prescriptions', label: 'Prescriptions', icon: 'file-text', screen: 'prescriptions' },
    { id: 'tab-profile', label: 'Profile', icon: 'user', screen: 'profile' },
  ],
  sections: [
    {
      id: 'sec-hero-normal',
      type: 'hero_banner',
      background: {
        kind: 'gradient',
        value: '#0F766E,#115E59',
      },
      title: 'Tapza Care Hyderabad & Vijayawada',
      items: [
        {
          id: 'banner-1',
          greeting: 'Namaste, Patient & Family',
          title: 'Direct WhatsApp Prescriptions & Trusted Clinic Care',
          subtitle: 'Walk in or book an instant slot with top local specialists',
          ctaText: 'Book an Appointment',
          ctaAction: 'navigate:bookings',
        },
      ],
    },
    {
      id: 'sec-categories',
      type: 'category_chips',
      background: {
        kind: 'color',
        value: '#F1F5F9',
      },
      title: 'Explore Specialties & Services',
      items: [
        { id: 'cat-gp', label: 'General Physician', icon: 'stethoscope', categoryKey: 'general' },
        { id: 'cat-cardio', label: 'Cardiologist', icon: 'heart', categoryKey: 'cardiology' },
        { id: 'cat-ped', label: 'Pediatrician', icon: 'baby', categoryKey: 'pediatrics' },
        { id: 'cat-ortho', label: 'Orthopedics', icon: 'activity', categoryKey: 'orthopedics' },
        { id: 'cat-lab', label: 'Lab Tests', icon: 'clipboard', categoryKey: 'lab_tests' },
        { id: 'cat-pharm', label: 'Pharmacy Delivery', icon: 'package', categoryKey: 'pharmacy' },
        { id: 'cat-vac', label: 'Vaccines', icon: 'shield', categoryKey: 'vaccines' },
      ],
    },
    {
      id: 'sec-quick-actions',
      type: 'quick_actions',
      background: {
        kind: 'color',
        value: '#FFFFFF',
      },
      title: 'Quick Actions',
      items: [
        { id: 'qa-book', label: 'Book Doctor', sublabel: 'Instant Slot', icon: 'calendar-plus', action: 'navigate:bookings' },
        { id: 'qa-rx', label: 'Prescriptions', sublabel: 'WhatsApp Rx', icon: 'file-text', action: 'navigate:prescriptions', badge: 'Active' },
        { id: 'qa-remind', label: 'Dose Tracker', sublabel: 'Daily Pills', icon: 'bell', action: 'navigate:prescriptions' },
        { id: 'qa-family', label: 'Family Care', sublabel: 'Add Member', icon: 'users', action: 'action:family' },
      ],
    },
    {
      id: 'sec-offer',
      type: 'offer_strip',
      background: {
        kind: 'color',
        value: '#ECFDF5',
      },
      title: 'Clinic Benefit',
      items: [
        {
          id: 'off-1',
          text: '⚡ Free WhatsApp follow-up for 7 days after your clinic visit. Valid across all Tapza partner clinics.',
          couponCode: 'TAPZAFREE',
          actionText: 'View Details',
        },
      ],
    },
    {
      id: 'sec-doctors',
      type: 'doctor_carousel',
      background: {
        kind: 'color',
        value: '#F8FAFC',
      },
      title: 'Available Specialists Today',
      items: [
        {
          id: 'doc-carousel-1',
          doctorId: 'doc-1',
          name: 'Dr. A. Srinivas Rao, MD',
          specialty: 'Senior General Physician',
          photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
          feeInr: 450,
          languages: ['Telugu', 'English', 'Hindi'],
          nextSlot: 'Today, 04:30 PM',
          rating: 4.9,
          clinicName: 'Tapza Clinic, Banjara Hills, Hyderabad',
        },
        {
          id: 'doc-carousel-2',
          doctorId: 'doc-2',
          name: 'Dr. Lakshmi Prasanna, MBBS, DGO',
          specialty: 'Obstetrician & Gynecologist',
          photoUrl: 'https://images.unsplash.com/photo-1594824813589-9800e7ff910c?auto=format&fit=crop&w=400&q=80',
          feeInr: 500,
          languages: ['Telugu', 'English'],
          nextSlot: 'Today, 05:00 PM',
          rating: 4.8,
          clinicName: 'Tapza Care, Governorpet, Vijayawada',
        },
        {
          id: 'doc-carousel-3',
          doctorId: 'doc-3',
          name: 'Dr. Rajesh Kumar Reddy, MD, DM',
          specialty: 'Consultant Cardiologist',
          photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
          feeInr: 700,
          languages: ['Telugu', 'Hindi', 'English'],
          nextSlot: 'Tomorrow, 10:00 AM',
          rating: 4.9,
          clinicName: 'Tapza Heart Clinic, Kukatpally, Hyderabad',
        },
        {
          id: 'doc-carousel-4',
          doctorId: 'doc-4',
          name: 'Dr. Sneha Kulkarni, MD',
          specialty: 'Pediatrician & Child Specialist',
          photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
          feeInr: 400,
          languages: ['Hindi', 'Telugu', 'English'],
          nextSlot: 'Today, 06:15 PM',
          rating: 4.9,
          clinicName: 'Tapza Kids Clinic, Benz Circle, Vijayawada',
        },
      ],
    },
    {
      id: 'sec-services',
      type: 'service_grid',
      background: {
        kind: 'color',
        value: '#FFFFFF',
      },
      title: 'Order Clinic Diagnostics & Tests (Zepto Style)',
      items: [
        {
          id: 'srv-1',
          name: 'Diabetes HbA1c Test',
          priceInr: 299,
          originalPriceInr: 500,
          imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80',
          badge: '40% OFF',
          duration: '6 hrs report',
          testsCount: 1,
        },
        {
          id: 'srv-2',
          name: 'Full Body Health Package',
          priceInr: 999,
          originalPriceInr: 2200,
          imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=400&q=80',
          badge: 'POPULAR',
          duration: '12 hrs report',
          testsCount: 68,
        },
        {
          id: 'srv-3',
          name: '12-Lead ECG at Clinic',
          priceInr: 350,
          originalPriceInr: 450,
          imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80',
          badge: 'INSTANT',
          duration: '15 mins',
          testsCount: 1,
        },
        {
          id: 'srv-4',
          name: 'Thyroid Profile (T3, T4, TSH)',
          priceInr: 450,
          originalPriceInr: 750,
          imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
          badge: 'FAST',
          duration: '8 hrs report',
          testsCount: 3,
        },
        {
          id: 'srv-5',
          name: 'Lipid Profile (Cholesterol)',
          priceInr: 399,
          originalPriceInr: 600,
          imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
          duration: '8 hrs report',
          testsCount: 7,
        },
        {
          id: 'srv-6',
          name: 'Complete Blood Count (CBC)',
          priceInr: 240,
          originalPriceInr: 350,
          imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
          duration: '4 hrs report',
          testsCount: 22,
        },
      ],
    },
    {
      // Unknown section type to test resilience: specification says unknown type must skip and never crash!
      id: 'sec-unknown-experimental',
      type: 'ai_smart_vitals_telemetry_radar',
      background: {
        kind: 'color',
        value: '#F1F5F9',
      },
      title: 'Experimental Future Telemetry',
      items: [{ id: 'unk-1', test: 'sample' }],
    },
  ],
};

export const FESTIVAL_LAYOUT_CONFIG: LayoutConfig = {
  version: 2,
  theme: {
    primary: '#C2410C', // Festive Deep Saffron
    secondary: '#EA580C', // Warm Marigold Orange
    background: '#FFFBEB', // Warm festive cream
    surface: '#FFFFFF',
    textPrimary: '#451A03',
    textSecondary: '#78350F',
    accent: '#D97706', // Royal Gold
    festival: {
      name: 'Diwali Dhamaka Care 🪔',
      greeting: 'Shubh Deepawali! Wishing Good Health to You & Family',
      bannerImageUrl: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?auto=format&fit=crop&w=1200&q=80',
    },
  },
  tabs: [
    { id: 'tab-home', label: 'Festive Home', icon: 'home', screen: 'home' },
    { id: 'tab-bookings', label: 'Consult', icon: 'calendar', screen: 'bookings' },
    { id: 'tab-prescriptions', label: 'Medicines', icon: 'file-text', screen: 'prescriptions' },
    { id: 'tab-profile', label: 'My Care', icon: 'user', screen: 'profile' },
  ],
  // Notice: Completely different section ordering for festival! Offer strip on top, followed by special checkups
  sections: [
    {
      id: 'sec-fest-offer',
      type: 'offer_strip',
      background: {
        kind: 'color',
        value: '#FEF3C7',
      },
      title: 'Diwali Festival Bonanza',
      items: [
        {
          id: 'off-fest-1',
          text: '🪔 DIWALI CARE FEST: 30% Off on Family Health Packages & Free WhatsApp Doctor Re-consultation!',
          couponCode: 'DIWALIHEALTH',
          actionText: 'Claim Now',
        },
      ],
    },
    {
      id: 'sec-fest-hero',
      type: 'hero_banner',
      background: {
        kind: 'gradient',
        value: '#C2410C,#7C2D12',
      },
      title: 'Tapza Diwali Health Mela',
      items: [
        {
          id: 'banner-diwali',
          greeting: '✨ Shubh Deepawali! Keep Your Sugar & Heart Safe',
          title: 'Special Festival Clinic Hours in Hyderabad & Vijayawada',
          subtitle: 'Enjoy sweets with peace of mind. Instant morning & evening clinic slots.',
          ctaText: 'Book Festive Checkup',
          ctaAction: 'navigate:bookings',
        },
      ],
    },
    {
      id: 'sec-fest-services',
      type: 'service_grid',
      background: {
        kind: 'color',
        value: '#FFFBEB',
      },
      title: 'Diwali Special Health Packages (Special Prices)',
      items: [
        {
          id: 'fest-srv-1',
          name: 'Diwali Sweet & Sugar Shield',
          priceInr: 399,
          originalPriceInr: 900,
          imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80',
          badge: 'FESTIVAL 55% OFF',
          duration: 'Same day report',
          testsCount: 4,
        },
        {
          id: 'fest-srv-2',
          name: 'Family Festive Care (4 Members)',
          priceInr: 1499,
          originalPriceInr: 3600,
          imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=400&q=80',
          badge: 'MEGA SAVER',
          duration: '24 hrs report',
          testsCount: 85,
        },
        {
          id: 'fest-srv-3',
          name: 'Elder Parents Heart & BP Check',
          priceInr: 699,
          originalPriceInr: 1200,
          imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80',
          badge: 'SENIOR CARE',
          duration: 'At Clinic',
          testsCount: 3,
        },
      ],
    },
    {
      id: 'sec-fest-quick-actions',
      type: 'quick_actions',
      background: {
        kind: 'color',
        value: '#FFFFFF',
      },
      title: 'Festive Quick Links',
      items: [
        { id: 'fqa-book', label: 'Doctor Slot', sublabel: 'Fast Track', icon: 'calendar-plus', action: 'navigate:bookings' },
        { id: 'fqa-rx', label: 'My Prescriptions', sublabel: 'WhatsApp Copy', icon: 'file-text', action: 'navigate:prescriptions', badge: 'Active' },
        { id: 'fqa-dose', label: 'Pill Reminders', sublabel: 'Stay on Track', icon: 'bell', action: 'navigate:prescriptions' },
        { id: 'fqa-fest', label: 'Diwali Gifts', sublabel: 'Health Voucher', icon: 'gift', action: 'action:festival' },
      ],
    },
    {
      id: 'sec-fest-doctors',
      type: 'doctor_carousel',
      background: {
        kind: 'color',
        value: '#FFF7ED',
      },
      title: 'Doctors On Duty This Festival Week',
      items: [
        {
          id: 'fest-doc-1',
          doctorId: 'doc-1',
          name: 'Dr. A. Srinivas Rao, MD',
          specialty: 'Senior General Physician',
          photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
          feeInr: 450,
          languages: ['Telugu', 'English', 'Hindi'],
          nextSlot: 'Today, 04:30 PM',
          rating: 4.9,
          clinicName: 'Tapza Clinic, Banjara Hills, Hyderabad',
        },
        {
          id: 'fest-doc-3',
          doctorId: 'doc-3',
          name: 'Dr. Rajesh Kumar Reddy, MD, DM',
          specialty: 'Consultant Cardiologist',
          photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
          feeInr: 700,
          languages: ['Telugu', 'Hindi', 'English'],
          nextSlot: 'Tomorrow, 10:00 AM',
          rating: 4.9,
          clinicName: 'Tapza Heart Clinic, Kukatpally, Hyderabad',
        },
      ],
    },
  ],
};

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. A. Srinivas Rao',
    specialty: 'General Physician & Diabetologist',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    feeInr: 450,
    languages: ['Telugu', 'English', 'Hindi'],
    rating: 4.9,
    experienceYears: 16,
    clinicName: 'Tapza Clinic, Banjara Hills',
    clinicLocation: 'Road No. 12, Banjara Hills, Hyderabad',
    about: 'Specializes in diabetes management, hypertension, seasonal fevers, and comprehensive family health.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 'doc-2',
    name: 'Dr. Lakshmi Prasanna',
    specialty: 'Obstetrics & Gynecology',
    photoUrl: 'https://images.unsplash.com/photo-1594824813589-9800e7ff910c?auto=format&fit=crop&w=400&q=80',
    feeInr: 500,
    languages: ['Telugu', 'English'],
    rating: 4.8,
    experienceYears: 12,
    clinicName: 'Tapza Women Care, Governorpet',
    clinicLocation: 'Eluru Road, Governorpet, Vijayawada',
    about: 'Expert in prenatal care, PCOD/PCOS treatments, women wellness and routine health screenings.',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh Kumar Reddy',
    specialty: 'Consultant Cardiologist',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    feeInr: 700,
    languages: ['Telugu', 'Hindi', 'English'],
    rating: 4.9,
    experienceYears: 20,
    clinicName: 'Tapza Heart Clinic, Kukatpally',
    clinicLocation: 'Near Metro Station, Kukatpally, Hyderabad',
    about: 'Cardiac risk assessment, preventative cardiology, post-CABG and hypertension management.',
    availableDays: ['Tue', 'Thu', 'Sat'],
  },
  {
    id: 'doc-4',
    name: 'Dr. Sneha Kulkarni',
    specialty: 'Pediatrician & Neonatologist',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    feeInr: 400,
    languages: ['Hindi', 'Telugu', 'English'],
    rating: 4.9,
    experienceYears: 10,
    clinicName: 'Tapza Kids Clinic, Benz Circle',
    clinicLocation: 'MG Road, Near Benz Circle, Vijayawada',
    about: 'Childhood vaccinations, growth milestone assessments, pediatric asthma and nutritional guidance.',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
  },
  {
    id: 'doc-5',
    name: 'Dr. M. Venkat Raman',
    specialty: 'Orthopedic Surgeon & Joint Care',
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    feeInr: 550,
    languages: ['Telugu', 'English'],
    rating: 4.7,
    experienceYears: 18,
    clinicName: 'Tapza Bone & Joint, Ameerpet',
    clinicLocation: 'Near Elephant Circle, Ameerpet, Hyderabad',
    about: 'Arthritis relief, knee and back pain management, fracture rehabilitation, and osteoporosis care.',
    availableDays: ['Mon', 'Tue', 'Thu', 'Sat'],
  },
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-2026-001',
    issuedAt: '2026-10-20T10:30:00Z',
    doctorName: 'Dr. A. Srinivas Rao, MD',
    clinicName: 'Tapza Clinic, Banjara Hills, Hyderabad',
    patientName: 'Bhargav Parmar',
    diagnosis: 'Type 2 Diabetes & Mild Hypertension Routine Follow-up',
    medicines: [
      {
        id: 'med-101',
        name: 'Metformin Hydrochloride 500mg (Glyciphage)',
        dose: '1 Tablet',
        days: 30,
        timing: ['morning', 'night'],
        instructions: 'Take immediately after meals with plenty of water',
      },
      {
        id: 'med-102',
        name: 'Telmisartan 40mg (Telma 40)',
        dose: '1 Tablet',
        days: 30,
        timing: ['morning'],
        instructions: 'Take in the morning after breakfast for BP control',
      },
      {
        id: 'med-103',
        name: 'Multivitamin & Zinc Tablet (Becozinc)',
        dose: '1 Tablet',
        days: 15,
        timing: ['afternoon'],
        instructions: 'Take after lunch',
      },
    ],
  },
  {
    id: 'rx-2026-002',
    issuedAt: '2026-10-15T16:00:00Z',
    doctorName: 'Dr. Lakshmi Prasanna, MBBS, DGO',
    clinicName: 'Tapza Women Care, Governorpet, Vijayawada',
    patientName: 'Bhargav Parmar (Family Record)',
    diagnosis: 'Seasonal Viral Fever & Body Aches',
    medicines: [
      {
        id: 'med-201',
        name: 'Paracetamol 650mg (Dolo 650)',
        dose: '1 Tablet',
        days: 5,
        timing: ['morning', 'afternoon', 'night'],
        instructions: 'Take strictly after meals if temperature > 99°F',
      },
      {
        id: 'med-202',
        name: 'Pantoprazole 40mg (Pan 40)',
        dose: '1 Tablet',
        days: 5,
        timing: ['morning'],
        instructions: 'Take on empty stomach 30 mins before morning tea',
      },
      {
        id: 'med-203',
        name: 'Vitamin C 500mg Chewable (Limcee)',
        dose: '1 Tablet',
        days: 10,
        timing: ['afternoon'],
        instructions: 'Chew after lunch',
      },
    ],
  },
  {
    id: 'rx-2026-003',
    issuedAt: '2026-09-28T11:15:00Z',
    doctorName: 'Dr. M. Venkat Raman',
    clinicName: 'Tapza Bone & Joint, Ameerpet, Hyderabad',
    patientName: 'Bhargav Parmar',
    diagnosis: 'Mild Cervical & Lower Back Sprain',
    medicines: [
      {
        id: 'med-301',
        name: 'Aceclofenac + Paracetamol (Zerodol-P)',
        dose: '1 Tablet',
        days: 7,
        timing: ['morning', 'night'],
        instructions: 'Take after meals for pain relief',
      },
      {
        id: 'med-302',
        name: 'Calcium + Vitamin D3 (Shelcal 500)',
        dose: '1 Tablet',
        days: 30,
        timing: ['night'],
        instructions: 'Take with warm milk at bedtime',
      },
    ],
  },
];

export const generateMockSlots = (doctorId: string, dateStr: string): Slot[] => {
  const baseSlots = [
    { id: `${doctorId}-${dateStr}-0900`, startsAt: '09:00 AM', endsAt: '09:30 AM', available: true },
    { id: `${doctorId}-${dateStr}-0930`, startsAt: '09:30 AM', endsAt: '10:00 AM', available: true },
    { id: `${doctorId}-${dateStr}-1030`, startsAt: '10:30 AM', endsAt: '11:00 AM', available: false }, // taken
    { id: `${doctorId}-${dateStr}-1130`, startsAt: '11:30 AM', endsAt: '12:00 PM', available: true },
    { id: `${doctorId}-${dateStr}-1630`, startsAt: '04:30 PM', endsAt: '05:00 PM', available: true },
    { id: `${doctorId}-${dateStr}-1700`, startsAt: '05:00 PM', endsAt: '05:30 PM', available: true },
    { id: `${doctorId}-${dateStr}-1800`, startsAt: '06:00 PM', endsAt: '06:30 PM', available: false }, // taken
    { id: `${doctorId}-${dateStr}-1900`, startsAt: '07:00 PM', endsAt: '07:30 PM', available: true },
  ];

  return baseSlots.map(s => ({
    ...s,
    doctorId,
  }));
};
