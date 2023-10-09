import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'home',
        link: '/',
    },
    {
        id: 3,
        label: 'Drivers List',
        icon: 'users',
        link: '/home/driver-list'
    },
    {
        id: 4,
        label: 'Vehicle List',
        icon: 'file-text',
        link: '/home/vehicle-list'
    },
];

