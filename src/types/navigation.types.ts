import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  HomeTab: undefined;
  BookingsTab: undefined;
  PrescriptionsTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  DoctorBooking: {
    doctorId?: string;
    doctorName?: string;
    specialty?: string;
    feeInr?: number;
    clinicName?: string;
    serviceName?: string;
  };
  PrescriptionDetail: {
    prescriptionId: string;
    doctorName?: string;
  };
  AdminConfig: undefined;
};
