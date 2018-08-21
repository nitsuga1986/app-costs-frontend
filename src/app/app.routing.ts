import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from './productos/productos.component';
import { LotesComponent } from './lotes/lotes.component';
import { LoteAddComponent } from './lote-add/lote-add.component';
import { ComprasComponent } from './compras/compras.component';
import { CompraAddComponent } from './compra-add/compra-add.component';
import { VentumComponent } from './ventum/ventum.component';
import { VentaAddComponent } from './venta-add/venta-add.component';

import { HomeComponent } from './home/home.component';

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
