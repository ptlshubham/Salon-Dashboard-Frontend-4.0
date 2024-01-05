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
];

