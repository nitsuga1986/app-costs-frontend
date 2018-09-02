import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { FormsModule }   from '@angular/forms';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { ModalModule } from "ngx-bootstrap";

@NgModule({
    imports: [ ModalModule, RouterModule, CommonModule, FormsModule ],
    declarations: [ NavbarComponent, AuthDialogComponent, LoginFormComponent, RegisterFormComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
