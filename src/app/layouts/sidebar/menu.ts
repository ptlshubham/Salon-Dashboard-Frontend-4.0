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
        label: 'Service List',
        icon: 'list',
        link: '/custom/service-list',
    },
    {
        id: 3,
        label: 'Employee List',
        icon: 'users',
        link: '/custom/employee-list',
    },
    {
        id: 113,
        label: 'Drivers List',
        icon: 'users',
        link: '/home/driver-list'
    },
    {
        id: 114,
        label: 'Vehicle List',
        icon: 'file-text',
        link: '/home/vehicle-list'
    },
];

