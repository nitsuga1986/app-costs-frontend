import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';
import { Compra } from '../models/compra';
import { Producto } from '../models/producto';
import { Lote } from '../models/lote';


@Component({
  selector: 'app-compra-add',
  templateUrl: './compra-add.component.html',
  styleUrls: ['./compra-add.component.scss']
})
export class CompraAddComponent implements OnInit {
  public datePipe : DatePipe  = new DatePipe("en-US");
  public compra : Compra  = new Compra();
  public productos : Producto[]
  public lotes : Lote[]

  constructor(public apiService: ApiService, public functions: FunctionsService, public acRoute : ActivatedRoute) { }

  ngOnInit() {

    // GET ROUTE PARAMS
    this.acRoute.params.subscribe((data : any)=>{
      if(data && data.id){
        this.apiService.get("compras/"+data.id).subscribe((data : Compra)=>{
          this.compra = data;
        });
      }
      else
      { var date = new Date();
        this.compra = new Compra();
        this.compra.fecha = this.datePipe.transform(date,"yyyy-MM-dd");
      }
    })

    // GET PRODUCTOS & LOTES INDEX
    this.apiService.get("productos").subscribe((data : Producto[])=>{
      console.log(data);
      this.productos = data;
      if(this.compra.producto_id == undefined){
        this.compra.producto_id = data[0].id
      }
    });
    this.apiService.get("lotes").subscribe((data : Lote[])=>{
      console.log(data);
      this.lotes = data
      if(this.compra.lote_id == undefined){
        this.compra.lote_id = data[data.length-1].id
      }
    });

  }

  // SUBMIT: UPDATE OR CREATE
  public onSubmit(){
    console.log("Adding a compra: " + this.compra.extdoc);
    if(this.compra.id){   // UPDATE
      this.apiService.update("compras/"+this.compra.id,this.compra).subscribe(
        (res: Compra) => {
        console.log(res);
        this.functions.showNotification('Compra actualizado: '+res.extdoc, 'success', 'pe-7s-plus');
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
    this.apiService.post("compras",this.compra).subscribe(
      (res: Compra) => {
      console.log(res);
      this.functions.showNotification('Compra guardado: '+res.extdoc, 'success', 'pe-7s-plus');
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
