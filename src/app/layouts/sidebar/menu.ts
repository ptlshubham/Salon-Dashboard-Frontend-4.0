import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARDS.TEXT',
    icon: 'mdi mdi-monitor-dashboard',
    link: '/',
  },
  {
    id: 3,
    label: 'Customer List',
    icon: 'mdi mdi-account-group',
    link: '/custom/user-list',
  },
  {
    id: 4,
    label: 'Service List',
    icon: 'mdi mdi-playlist-check',
    link: '/custom/service-list',
  },
  {
    id: 5,
    label: 'Employee List',
    icon: 'mdi mdi-account-multiple',
    link: '/custom/employee-list',
  },
  {
    id: 6,
    label: 'Expense',
    icon: 'mdi mdi-finance',
    link: '/custom/expenses',
  },
  {
    id: 7,
    label: 'Combo Offer',
    icon: 'mdi mdi-sale',
    link: '/custom/combo-offer',
  },
  {
    id: 8,
    label: 'Membership',
    icon: 'mdi mdi-wallet-membership',
    link: '/custom/membership',
  },
  {
    id: 9,
    label: 'Vendor',
    icon: 'mdi mdi-cart',
    link: '/custom/vendor',
  },
  {
    id: 10,
    label: 'banners',
    icon: 'mdi mdi-image-area',
    link: '/custom/banners'
  }
];
