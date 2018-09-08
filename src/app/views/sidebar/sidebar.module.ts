import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { ForFilter } from '../../pipes/forFilter.pipe';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComponent, ForFilter ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
