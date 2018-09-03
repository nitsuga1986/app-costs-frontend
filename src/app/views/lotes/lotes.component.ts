import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';

import { Lote } from '../../models/lote';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css'],
})

export class LotesComponent implements OnInit {
  public productos : Producto[];
  public lotes : Lote[];
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
        nombre: {       title: 'Nombre',
                        filter: false
        },
        fechaelav: {    title: 'Fecha de elaboración',
                        filter: false
        },
        fechavenc: {    title: 'Fecha de vencimiento',
                        filter: false
        },
        producto: {     title: 'Producto',
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
  }
  ngOnInit() {
    this.apiService.get("lotes").subscribe((data: Lote[])=>{
      this.lotes = data;
      console.log(this.lotes);
      this.apiService.get("productos").subscribe((data : Producto[])=>{
        this.productos = data
        console.log(this.productos);
        this.lotes.forEach((item:any, index:any) => {
            this.lotes[index].producto =  this.productos.filter(x => x.id == item.productoterm)[0].nombre;
        })
        this.source = new LocalDataSource(this.lotes);
      });
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
      { field: 'fechaelav',
        search: query },
      { field: 'fechavenc',
        search: query },
      { field: 'productoterm',
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
    if (window.confirm('Desea borrar: '+event.data.nombre+'?')) {
      console.log("Delete: "+event.data.nombre);
      var path = 'lotes/' + event.data.id;
      this.apiService.delete(path).subscribe(
         res => {
           console.log("Confirmed");
           this.source.remove(event.data);
           this.functions.showNotification('Producto eliminado: '+event.data.nombre, 'success', 'pe-7s-plus');
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
  createLink(event) { this.router.navigateByUrl('/lote/add'); }
  editLink(event) { this.router.navigateByUrl('/lote/add/'+event.data.id); }

}
