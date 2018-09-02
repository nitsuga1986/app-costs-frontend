import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Angular2TokenService } from 'angular2-token';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule } from "ngx-bootstrap";

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { HomeComponent } from './views/home/home.component';
import { ProductosComponent } from './views/productos/productos.component';
import { LotesComponent } from './views/lotes/lotes.component';
import { LoteAddComponent } from './views/lote-add/lote-add.component';
import { ComprasComponent } from './views/compras/compras.component';
import { CompraAddComponent } from './views/compra-add/compra-add.component';
import { VentumComponent } from './views/ventum/ventum.component';
import { VentaAddComponent } from './views/venta-add/venta-add.component';

import { NavbarModule } from './views/shared/navbar/navbar.module';
import { FooterModule } from './views/shared/footer/footer.module';
import { SidebarModule } from './views/sidebar/sidebar.module';
import { LbdModule } from './views/lbd/lbd.module';

import { ApiService } from './services/api.service';
import { FunctionsService } from './services/functions.service';

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
    LbdModule,
    ModalModule.forRoot()
  ],
  providers: [Angular2TokenService, ApiService, DatePipe, FunctionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
