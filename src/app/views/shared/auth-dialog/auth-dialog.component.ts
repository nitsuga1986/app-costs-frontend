import {Component, ViewChild, OnInit, Input, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  @ViewChild(ModalDirective) modal: ModalDirective;
  @Input('auth-mode') authMode: 'login' | 'register' = 'login';

  constructor() { }
  ngOnInit() { }

  openDialog(mode: 'login' | 'register' = 'login'){
    this.authMode = mode;
    this.modal.show();
  }

  closeDialog(){
    this.modal.hide();
  }


  isLoginMode(){return this.authMode == 'login'}
  isRegisterMode(){return this.authMode == 'register'}

  onLoginFormResult(e){
    if(e.signedIn)
      this.closeDialog();
    else{
      alert(e.err.json().errors[0])
    }
  }

  onRegisterFormResult(e){
    if(e.signedUp)
      this.closeDialog();
    else{
      alert(e.err.json().errors.full_messages[0])
    }
  }

}
