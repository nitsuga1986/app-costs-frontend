import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';

import { Compra } from '../../models/compra';
import { Producto } from '../../models/producto';
import { Lote } from '../../models/lote';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})

export class ComprasComponent implements OnInit {
  public compras : Compra[]
  public productos : Producto[]
  public lotes : Lote[]
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
                      filter: false,
                      sortDirection:'desc'
      },
      extdoc: {       title: 'extdoc',
                      filter: false
      },
      fecha: {        title: 'Fecha de compra',
                      filter: false
      },
      producto: {     title: 'Producto',
                      filter: false
      },
      lote: {         title: 'Lote',
                      filter: false
      },
      preciounitario:{title: 'Precio',
                      filter: false,
                      valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US',
                        {style:'currency', currency: 'USD', currencyDisplay: 'symbol'}).format(value)
                      }
      },
      cantidad: {     title: 'Cantidad',
                      filter: false,
                      valuePrepareFunction: (value) => { return Intl.NumberFormat('en-US',
                        {style:'decimal'}).format(value)
                      }
      },
      total: {        title: 'Total',
                      filter: false,
                      valuePrepareFunction: (cell, row) => { return Intl.NumberFormat('en-US',
                        {style:'currency', currency: 'USD', currencyDisplay: 'symbol'}).format(row.cantidad*row.preciounitario)
                      }
      },
    },

  };

  source: LocalDataSource;

  constructor(public apiService: ApiService, public functions: FunctionsService, public router : Router) {}

  ngOnInit() {
    this.apiService.get("compras").subscribe((data: Compra[])=>{
      this.compras = data;
      console.log(this.compras);
      this.apiService.get("productos").subscribe((data : Producto[])=>{
        this.productos = data
        console.log(this.productos);
        this.compras.forEach((item:any, index:any) => {
            this.compras[index].producto =  this.productos.filter(x => x.id == item.producto_id)[0].nombre;
        })
        this.source = new LocalDataSource(this.compras);
      });
      this.apiService.get("lotes").subscribe((data : Lote[])=>{
        this.lotes = data
        console.log(this.lotes);
        this.compras.forEach((item:any, index:any) => {
            this.compras[index].lote =  this.lotes.filter(x => x.id == item.lote_id)[0].nombre;
        })
        this.source = new LocalDataSource(this.compras);
      });
    });
  }

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
      var path = 'compras/' + event.data.id;
      this.apiService.delete(path).subscribe(
         res => {
           console.log("Confirmed");
           this.source.remove(event.data);
           this.functions.showNotification('Compra eliminada: '+event.data.extdoc, 'success', 'pe-7s-plus');
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
  createLink(event) { this.router.navigateByUrl('/compra/add'); }
  editLink(event) { this.router.navigateByUrl('/compra/add/'+event.data.id); }


}
