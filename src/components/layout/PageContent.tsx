import React from 'react';
import ContactList from '../contacts/ContactList';
import PrescriptionList from '../prescriptions/PrescriptionList';
import Schedule from '../Schedule';
import Settings from '../Settings';
import RxLog from '../rxLogs/RxLog';
import UserProfile from '../profile/UserProfile';

interface PageContentProps {
  activeTab: string;
}

export default function PageContent({ activeTab }: PageContentProps) {
  switch (activeTab) {
    case 'schedule':
      return <Schedule />;
    case 'contacts':
      return <ContactList />;
    case 'prescriptions':
      return <PrescriptionList />;
    case 'rxlog':
      return <RxLog />;
    case 'settings':
      return <Settings />;
    case 'profile':
      return <UserProfile />;
    default:
      return <Schedule />;
  }
}