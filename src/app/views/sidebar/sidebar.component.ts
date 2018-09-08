import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    forLogged: boolean;
}
export const ROUTES: RouteInfo[] = [
  { path: 'landing', title: 'Home',  icon: 'pe-7s-home', class: '', forLogged:false },
  { path: 'dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '', forLogged:true },
  { path: 'ventas', title: 'Ventas',   icon:'pe-7s-cash', class: '', forLogged:true },
  { path: 'compras', title: 'Compras',  icon:'pe-7s-credit', class: '', forLogged:true },
  { path: 'lotes', title: 'Lotes',  icon:'pe-7s-box1', class: '', forLogged:true },
  { path: 'producto', title: 'Productos',  icon:'pe-7s-cart', class: '', forLogged:true },
  { path: 'profile', title: 'Usuario',  icon:'pe-7s-user', class: '', forLogged:true },
  { path: 'login', title: 'Ingresar',  icon:'pe-7s-right-arrow', class: '', forLogged:false },
  { path: 'register', title: 'Registrarse',  icon:'pe-7s-left-arrow', class: '', forLogged:false },
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
