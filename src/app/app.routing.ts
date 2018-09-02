import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductosComponent } from './views/productos/productos.component';
import { LotesComponent } from './views/lotes/lotes.component';
import { LoteAddComponent } from './views/lote-add/lote-add.component';
import { ComprasComponent } from './views/compras/compras.component';
import { CompraAddComponent } from './views/compra-add/compra-add.component';
import { VentumComponent } from './views/ventum/ventum.component';
import { VentaAddComponent } from './views/venta-add/venta-add.component';


const routes: Routes =[
    { path: 'producto',       component: ProductosComponent },
    { path: 'lotes',          component: LotesComponent },
    { path: 'lote/add',       component: LoteAddComponent },
    { path: 'lote/add/:id',   component: LoteAddComponent },
    { path: 'compras',        component: ComprasComponent },
    { path: 'compra/add',     component: CompraAddComponent },
    { path: 'compra/add/:id', component: CompraAddComponent },
    { path: 'ventas',         component: VentumComponent },
    { path: 'venta/add',      component: VentaAddComponent },
    { path: 'venta/add/:id',  component: VentaAddComponent },
    { path: 'dashboard',      component: HomeComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
