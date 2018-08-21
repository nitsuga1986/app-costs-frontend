import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';

import { AppComponent } from './app.component';

import { ProductosComponent } from './productos/productos.component';
import { LotesComponent } from './lotes/lotes.component';
import { LoteAddComponent } from './lote-add/lote-add.component';
import { ComprasComponent } from './compras/compras.component';
import { CompraAddComponent } from './compra-add/compra-add.component';
import { VentumComponent } from './ventum/ventum.component';
import { VentaAddComponent } from './venta-add/venta-add.component';

import { HomeComponent } from './home/home.component';

import { ApiService } from './api.service';
import { FunctionsService } from './functions.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosComponent,
    LotesComponent,
    LoteAddComponent,
    ComprasComponent,
    CompraAddComponent,
    VentumComponent,
    VentaAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    Ng2SmartTableModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    AppRoutingModule,
    LbdModule
  ],
  providers: [DatePipe, ApiService, FunctionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
