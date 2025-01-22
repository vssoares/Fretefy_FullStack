import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TableModule } from 'src/app/components/table/table.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    RouterModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
