import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Angular2TokenService} from "angular2-token";

@Injectable()
export class ApiService {

  API_URL : string = "";
  //API_URL : string = "https://sazon-backend.herokuapp.com/";
  constructor(public http: HttpClient, private tokenService: Angular2TokenService) { }

  // GET method
  public get(path) {
      var endpoint = this.API_URL + path;
      return this.tokenService.get(endpoint).map(res => res.json());
  }

  // POST method
  public post(path:string,body:any) {
      var endpoint = this.API_URL + path;
      return this.tokenService.post(endpoint,body).map(res => res.json());
  }

  // DELETE method
  public delete(path:string){
    var endpoint = this.API_URL + path;
    return this.tokenService.delete(endpoint).map(res => res.json());
  }

  // UPDATE method
  public update(path:string, body:any){
    var endpoint = this.API_URL + path;
    return this.tokenService.put(endpoint,body).map(res => res.json());
  }

}
