import { Pipe, PipeTransform } from '@angular/core';
import {Angular2TokenService} from "angular2-token";

@Pipe({
    name: 'forFilter',
    pure: false
})
export class ForFilter implements PipeTransform {

  constructor(private authTokenService:Angular2TokenService){}

  transform(items: any[], filter: Object): any {
      console.log(filter);
      if (this.authTokenService.userSignedIn()) {
          return items;
      }
      // filter items array, items which match and return true will be
      // kept, false will be filtered out
      return items.filter(item => !item.forLogged);
  }

}
