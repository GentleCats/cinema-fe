// import ExploreIcon from '@mui/icons-material/Explore';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Theaters } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import { SvgIconProps } from '@mui/material';

export const routes = {
  PUBLIC: {
    HOME: '/',
    FILMS: '/films',
    SETTINGS: '/settings',
    PROFILE: '/profile',
    LOGIN: '/login',
    REGISTER: '/register',
    TICKET_BOOKING: '/ticket-booking',
    RECOMMENDED_FILMS: '/recommended-films',
  },
  PRIVATE: {
    HOME: '/admin',
    FILMS: '/admin/film',
    PROD_FILMS: '/admin/prod_films',
    HALLS: '/admin/halls',
    HALLS_CREATE: '/admin/halls/create',
    SESSIONS_CREATE: '/admin/sessions/create',
  },
  API: {
    ACCOUNT: '/Account',
    MOVIE: '/Movie',
    HALLS: '/Hall',
  },
};

interface SidebarLink {
  icon: React.ElementType<SvgIconProps>;
  route: string;
  label: string;
  isAdmin: boolean;
}

export const sidebarLinks: SidebarLink[] = [
  {
    icon: HomeIcon,
    label: 'Home',
    route: routes.PUBLIC.HOME,
    isAdmin: false
  },
  {
    icon: SettingsIcon,
    label: 'settings',
    route: routes.PRIVATE.HOME,
    isAdmin: true
  },
  {
    icon: PermIdentityIcon,
    label: 'profile',
    route: routes.PUBLIC.PROFILE,
    isAdmin: false
  },
  {
    icon: Theaters,
    label: 'Halls',
    route: routes.PRIVATE.HALLS,
    isAdmin: true
  },
  {
    icon: LocalActivityIcon,
    label: 'Recommended Films',
    route: routes.PUBLIC.RECOMMENDED_FILMS,
    isAdmin: false 
  },
];
