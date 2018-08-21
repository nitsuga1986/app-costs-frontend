import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { ApiService } from '../api.service';
import { FunctionsService } from '../functions.service';
import { Venta } from '../models/venta';

@Component({
  selector: 'app-ventum',
  templateUrl: './ventum.component.html',
  styleUrls: ['./ventum.component.css'],
})

export class VentumComponent implements OnInit {
    settings = {
      delete: {
        deleteButtonContent:  '<i class="fa fa-trash fa-2x fa-fw text-muted" aria-hidden="true" title=""></i>',
      },
      add:    {
        addButtonContent:     '<i class="fa fa-plus fa-2x fa-fw text-muted" aria-hidden="true" title=""></i>',
        createButtonContent:  '<i class="fa fa-check fa-2x fa-fw text-success" aria-hidden="true"></i>  ',
        cancelButtonContent:  '<i class="fa fa-times fa-2x fa-fw text-muted" aria-hidden="true"></i>',
      },
      edit:   {
        editButtonContent:    '<i class="fa fa-pencil fa-2x fa-fw text-muted" aria-hidden="true" title=""></i>',
        saveButtonContent:    '<i class="fa fa-check fa-2x fa-fw text-default" aria-hidden="true"></i>  ',
        cancelButtonContent:  '<i class="fa fa-times fa-2x fa-fw text-muted" aria-hidden="true"></i>',
      },
      attr: { class: 'table-smart table table-hover table-striped', },
      mode: 'external',
      columns: {
        id: {           title: 'ID',
                        editable: false,
                        addable: false,
                        filter: false
        },
        extdoc: {       title: 'extdoc',
                        filter: false
        },
        fecha: {        title: 'Fecha de venta',
                        sortDirection:'asc',
                        filter: false
        },
        fechavenc: {    title: 'Fecha de vencimiento',
                        filter: false
        },
        producto_id: {  title: 'Producto',
                        filter: false
        },
        lote_id: {      title: 'Lote',
                        filter: false
        },
        preciounitario:{title: 'Precio Unitario',
                        filter: false
        },
        cantidad: {     title: 'Cantidad',
                        filter: false
        },
      },
  };

  source: LocalDataSource;

  constructor(public apiService: ApiService, public functions: FunctionsService, public router : Router) {
    this.source = new LocalDataSource();

    this.apiService.get("venta").subscribe((data: Venta[])=>{
      console.log(data);
      this.source = new LocalDataSource(data);
    });

  }
  ngOnInit() {}

  // SEARCH
  onSearch(query: string = '') {
    if (query == '') { this.source.setFilter([], true); }
    else
    this.source.setFilter([
      // fields we want to include in the search
      { field: 'id',
        search: query },
      { field: 'extdoc',
        search: query },
      { field: 'fecha',
        search: query },
      { field: 'fechavenc',
        search: query },
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
  onStopSearch(query: string = '') {
    this.source.setFilter([], true);
  }

  // DELETE
  onDeleteConfirm(event) {
    if (window.confirm('Desea borrar: '+event.data.extdoc+'?')) {
      console.log("Delete: "+event.data.extdoc);
      var path = 'venta/' + event.data.id;
      this.apiService.delete(path).subscribe(
         res => {
           console.log("Confirmed");
           this.source.remove(event.data);
           this.functions.showNotification('Venta eliminada: '+event.data.extdoc, 'success', 'pe-7s-plus');
       },
       (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
           console.log("Client-side error occured.");
         } else {
           console.log("Server-side error occured.");
         }
         this.functions.showNotification('Lo sentimos, ha ocurrido un error =(', 'danger', 'pe-7s-attention');
       });
    } else {}
  }

  // LINKS CUSTOM
  createLink(event) { this.router.navigateByUrl('/venta/add'); }
  editLink(event) {   this.router.navigateByUrl('/venta/add/'+event.data.id); }

}
