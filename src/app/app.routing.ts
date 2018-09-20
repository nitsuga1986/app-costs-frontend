import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from "./guards/auth.guard";

import { LandingComponent } from './views/landing/landing.component';

import { HomeComponent } from './views/home/home.component';
import { PanelComponent } from './views/panel/panel.component';
import { ProductosComponent } from './views/productos/productos.component';
import { LotesComponent } from './views/lotes/lotes.component';
import { LoteAddComponent } from './views/lote-add/lote-add.component';
import { ComprasComponent } from './views/compras/compras.component';
import { CompraAddComponent } from './views/compra-add/compra-add.component';
import { VentumComponent } from './views/ventum/ventum.component';
import { VentaAddComponent } from './views/venta-add/venta-add.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthPageComponent } from './views/auth-page/auth-page.component';


const routes: Routes =[
    { path: 'landing',        component: LandingComponent },
    { path: 'login',          component: AuthPageComponent },
    { path: 'register',       component: AuthPageComponent },
    { path: 'logout',         component: AuthPageComponent },
    { path: 'dashboard',      component: HomeComponent,      canActivate: [AuthGuard]  },
    { path: 'main',           component: PanelComponent,       canActivate: [AuthGuard]  },
    { path: 'producto',       component: ProductosComponent,  canActivate: [AuthGuard]  },
    { path: 'lotes',          component: LotesComponent,      canActivate: [AuthGuard]  },
    { path: 'lote/add',       component: LoteAddComponent,    canActivate: [AuthGuard]  },
    { path: 'lote/add/:id',   component: LoteAddComponent,    canActivate: [AuthGuard]  },
    { path: 'compras',        component: ComprasComponent,    canActivate: [AuthGuard]  },
    { path: 'compra/add',     component: CompraAddComponent,  canActivate: [AuthGuard]  },
    { path: 'compra/add/:id', component: CompraAddComponent,  canActivate: [AuthGuard]  },
    { path: 'ventas',         component: VentumComponent,     canActivate: [AuthGuard]  },
    { path: 'venta/add',      component: VentaAddComponent,   canActivate: [AuthGuard]  },
    { path: 'venta/add/:id',  component: VentaAddComponent,   canActivate: [AuthGuard]  },
    { path: 'profile',        component: ProfileComponent,    canActivate: [AuthGuard] },
    { path: '',               redirectTo: 'landing', pathMatch: 'full' }
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
