import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';

import { Venta } from '../../models/venta';
import { Producto } from '../../models/producto';
import { Lote } from '../../models/lote';


@Component({
  selector: 'app-venta-add',
  templateUrl: './venta-add.component.html',
  styleUrls: ['./venta-add.component.scss']
})
export class VentaAddComponent implements OnInit {
  public datePipe : DatePipe  = new DatePipe("en-US");
  public venta : Venta  = new Venta();
  public productos : Producto[]
  public lotes : Lote[]
  public unitSelected = "U";

  constructor(public apiService: ApiService, public functions: FunctionsService, public acRoute : ActivatedRoute) { }

  ngOnInit() {

    // GET ROUTE PARAMS
    this.acRoute.params.subscribe((data : any)=>{
      if(data && data.id){
        this.apiService.get("venta/"+data.id).subscribe((data : Venta)=>{
          this.venta = data;
        });
      }
      else
      { var date = new Date();
        this.venta = new Venta();
        this.venta.fecha = this.datePipe.transform(date,"yyyy-MM-dd");
      }
    })

    // GET PRODUCTOS & LOTES INDEX
    this.apiService.get("productos").subscribe((data : Producto[])=>{
      console.log(data);
      this.productos = data
      if(this.venta.producto_id == undefined){
        this.venta.producto_id = data[0].id
      }
    });
    this.apiService.get("lotes").subscribe((data : Lote[])=>{
      console.log(data);
      this.lotes = data;
      if(this.venta.lote_id == undefined){
        this.venta.lote_id = data[data.length-1].id
      }
    });

  }

  // CHANGE UNIT
  public unitChange(producto_id): void {  // event will give you full breif of action
    this.unitSelected =  this.productos.filter(x => x.id == producto_id)[0].unidad;
    console.log(producto_id);
  }

  // SUBMIT: UPDATE OR CREATE
  public onSubmit(){
    console.log("Adding a venta: " + this.venta.extdoc);
    if(this.venta.id){   // UPDATE
      this.apiService.update("venta/"+this.venta.id,this.venta).subscribe(
        (res: Venta) => {
        console.log(res);
        this.venta = new Venta();
        this.functions.showNotification('Venta actualizado: '+res.extdoc, 'success', 'pe-7s-plus');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.functions.showNotification('Lo sentimos, ha ocurrido un error =(', 'danger', 'pe-7s-attention');
      });
    }
    else                 // CREATE
    this.apiService.post("venta",this.venta).subscribe(
      (res: Venta) => {
      console.log(res);
      this.venta = new Venta();
      this.functions.showNotification('Venta guardado: '+res.extdoc, 'success', 'pe-7s-plus');
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
      this.functions.showNotification('Lo sentimos, ha ocurrido un error =(', 'danger', 'pe-7s-attention');
    });
  }

}
