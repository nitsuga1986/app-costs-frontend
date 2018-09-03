import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    canActivate: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: 'landing', title: 'Home',  icon: 'pe-7s-home', class: '', canActivate:true },
  { path: 'dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '', canActivate:false },
  { path: 'ventas', title: 'Ventas',   icon:'pe-7s-cash', class: '', canActivate:false },
  { path: 'compras', title: 'Compras',  icon:'pe-7s-credit', class: '', canActivate:false },
  { path: 'lotes', title: 'Lotes',  icon:'pe-7s-box1', class: '', canActivate:false },
  { path: 'producto', title: 'Productos',  icon:'pe-7s-cart', class: '', canActivate:false },
  { path: 'profile', title: 'Usuario',  icon:'pe-7s-user', class: '', canActivate:false },
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
