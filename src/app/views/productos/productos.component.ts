import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';

import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})

export class ProductosComponent implements OnInit {
    settings = {
      delete: {
        deleteButtonContent:  '<i class="fa fa-trash fa-2x fa-fw text-muted" aria-hidden="true" title=""></i>',
        confirmDelete: true,
      },
      add:    {
        addButtonContent:     '<i class="fa fa-plus fa-2x fa-fw text-muted" aria-hidden="true" title=""></i>',
        createButtonContent:  '<i class="fa fa-check fa-2x fa-fw text-success" aria-hidden="true"></i>  ',
        cancelButtonContent:  '<i class="fa fa-times fa-2x fa-fw text-muted" aria-hidden="true"></i>',
        confirmCreate: true,
      },
      edit:   {
        editButtonContent:    '<i class="fa fa-pencil fa-2x fa-fw text-muted" aria-hidden="true" title=""></i>',
        saveButtonContent:    '<i class="fa fa-check fa-2x fa-fw text-default" aria-hidden="true"></i>  ',
        cancelButtonContent:  '<i class="fa fa-times fa-2x fa-fw text-muted" aria-hidden="true"></i>',
        confirmSave: true,
      },
      attr:   { class: 'table-smart table table-hover table-striped', },
      columns: {
        id: {
          title: 'ID',
          editable: false,
          addable: false,
          filter: false
        },
        nombre: {
          title: 'Nombre',
          sortDirection:'asc',
          filter: false
        },
        unidad: {
          title: 'Unidad',
          filter: false
        },
      },
  };

  source: LocalDataSource;

  constructor(public apiService: ApiService, public functions: FunctionsService, public router : Router) { }
  ngOnInit() {
    this.source = new LocalDataSource();

    this.apiService.get("productos").subscribe((data : Producto[])=>{
      console.log(data);
      this.source = new LocalDataSource(data);
    });
  }

  onSearch(query: string = '') {
    if (query == '') { this.source.setFilter([], true); }
    else
    this.source.setFilter([
      // fields we want to include in the search
      { field: 'id',
        search: query },
      { field: 'nombre',
        search: query },
      { field: 'unidad',
        search: query }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
  onStopSearch(query: string = '') {
    this.source.setFilter([], true);
  }
  // CREATE
  onCreateConfirm(event) {
    this.apiService.post("productos",event.newData).subscribe(
        (res: Producto) => {
        console.log(res);
        this.functions.showNotification('Producto guardado: '+res.nombre, 'success', 'pe-7s-plus');
        event.confirm.resolve(res);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.functions.showNotification('Lo sentimos, ha ocurrido un error =(', 'danger', 'pe-7s-attention');
        event.confirm.reject();
      });
  }

  // UPDATE
  onSaveConfirm(event) {
  this.apiService.update("productos/"+event.newData.id,event.newData).subscribe(
      (res: Producto) => {
      console.log(res);
      this.functions.showNotification('Producto guardado: '+res.nombre, 'success', 'pe-7s-plus');
      event.confirm.resolve(res);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
      this.functions.showNotification('Lo sentimos, ha ocurrido un error =(', 'danger', 'pe-7s-attention');
      event.confirm.reject();
    });
  }

    // DELETE
    onDeleteConfirm(event) {
      if (window.confirm('Desea borrar: '+event.data.nombre+'?')) {
        console.log("Delete: "+event.data.nombre);
        var path = 'productos/' + event.data.id;
        this.apiService.delete(path).subscribe(
           res => {
             console.log("Confirmed");
             this.functions.showNotification('Producto eliminado: '+event.data.nombre, 'success', 'pe-7s-plus');
             event.confirm.resolve(event.source.data);
         },
         (err: HttpErrorResponse) => {
           if (err.error instanceof Error) {
             console.log("Client-side error occured.");
           } else {
             console.log("Server-side error occured.");
           }
           this.functions.showNotification('Lo sentimos, ha ocurrido un error =(', 'danger', 'pe-7s-attention');
         });
      } else {
        event.confirm.reject();
      }
    }

}
