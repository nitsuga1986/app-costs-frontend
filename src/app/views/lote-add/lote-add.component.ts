import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { Lote } from '../../models/lote';
import { Producto } from '../../models/producto';


@Component({
  selector: 'app-lote-add',
  templateUrl: './lote-add.component.html',
  styleUrls: ['./lote-add.component.scss']
})
export class LoteAddComponent implements OnInit {
  public datePipe : DatePipe  = new DatePipe("en-US");
  public lote : Lote  = new Lote();
  public productos : Producto[];

  constructor(public apiService: ApiService, public functions: FunctionsService,
                public acRoute : ActivatedRoute) { }

  ngOnInit() {

    this.apiService.get("productos").subscribe((data : Producto[])=>{
      console.log(data);
      this.productos = data
      if(this.lote.productoterm == undefined){
        this.lote.productoterm = data[0].id
      }
    });

    // CREATE OR EDIT
    this.acRoute.params.subscribe((data : any)=>{
      if(data && data.id){
        this.apiService.get("lotes/"+data.id).subscribe((data : Lote)=>{
          this.lote = data;
        });
      }
      else
      { this.lote = new Lote();
        var date = new Date();
        this.lote.nombre = "Lote_"+this.datePipe.transform(date,"yy_MM_dd");
        this.lote.fechaelav = this.datePipe.transform(date,"yyyy-MM-dd");
        this.lote.fechavenc = this.datePipe.transform(date.setMonth(date.getMonth()+3),"yyyy-MM-dd");
        this.lote.cantidad = 1;
      }
    })
  }

  // CREATE
  public onSubmit(){
    console.log("Adding a lote: " + this.lote.nombre);
    if(this.lote.id){
      this.apiService.update("lotes/"+this.lote.id,this.lote).subscribe(
        (res: Lote) => {
        console.log(res);
        this.lote = new Lote();
        this.functions.showNotification('Lote actualizado: '+res.nombre, 'success', 'pe-7s-plus');
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
    else
    this.apiService.post("lotes",this.lote).subscribe(
      (res: Lote) => {
      console.log(res);
      this.lote = new Lote();
      this.functions.showNotification('Lote guardado: '+res.nombre, 'success', 'pe-7s-plus');
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
