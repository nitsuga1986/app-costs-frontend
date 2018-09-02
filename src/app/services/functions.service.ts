import { Injectable } from '@angular/core';

declare var $:any;

@Injectable()
export class FunctionsService {


  constructor() {

  }

  // GET method
  public showNotification(message, type, icon){
    $.notify({
        icon: icon,
        message: message,
    },{
        type: type,
        timer: 1000,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
  }


}
