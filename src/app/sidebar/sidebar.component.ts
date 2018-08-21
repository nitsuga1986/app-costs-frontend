import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
  { path: 'ventas', title: 'Ventas',   icon:'pe-7s-cash', class: '' },
  { path: 'compras', title: 'Compras',  icon:'pe-7s-credit', class: '' },
  { path: 'lotes', title: 'Lotes',  icon:'pe-7s-box1', class: '' },
  { path: 'producto', title: 'Productos',  icon:'pe-7s-cart', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
