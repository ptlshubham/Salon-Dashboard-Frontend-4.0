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
        label: 'Customer List',
        icon: 'users',
        link: '/custom/user-list',
    },
    {
        id: 4,
        label: 'Service List',
        icon: 'list',
        link: '/custom/service-list',
    },
    {
        id: 5,
        label: 'Employee List',
        icon: 'users',
        link: '/custom/employee-list',
    },
    {
        id:6,
        label:'Expense',
        icon:'clipboard',
        link:'/custom/expenses'
    },
    {
        id:7,
        label:'Combo Offer',
        icon:'gift',
        link:'/custom/combo-offer'
    }
];

