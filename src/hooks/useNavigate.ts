import { useState } from 'react';

export type Route = 'dashboard' | 'contacts' | 'prescriptions' | 'calendar' | 'settings' | 'profile' | 'rxlog';

export function useNavigate() {
  const [currentRoute, setCurrentRoute] = useState<Route>('dashboard');

  const navigateTo = (route: Route) => {
    setCurrentRoute(route);
  };

  return { currentRoute, navigateTo };
}