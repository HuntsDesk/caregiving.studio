export const getPageTitle = (page: string): string => {
  switch (page) {
    case 'dashboard':
      return 'Dashboard';
    case 'contacts':
      return 'Contacts';
    case 'prescriptions':
      return 'Prescriptions';
    case 'calendar':
      return 'Calendar';
    default:
      return 'Dashboard';
  }
};