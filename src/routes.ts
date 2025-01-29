// import ExploreIcon from '@mui/icons-material/Explore';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
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
  },
  PRIVATE: {},
  API: {},
};

interface SidebarLink {
  icon: React.ElementType<SvgIconProps>;
  route: string;
  label: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    icon: HomeIcon,
    label: 'Home',
    route: routes.PUBLIC.HOME,
  },
  {
    icon: SettingsIcon,
    label: 'settings',
    route: routes.PUBLIC.SETTINGS,
  },
  {
    icon: PermIdentityIcon,
    label: 'profile',
    route: routes.PUBLIC.PROFILE,
  },
];
