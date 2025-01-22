import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiaoComponent } from './regiao.component';
import { RegiaoRoutingModule } from './regiao.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'src/app/components/select/select.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelectModule,
    ReactiveFormsModule,
    RegiaoRoutingModule,
  ],
  declarations: [RegiaoComponent],
  exports: [RegiaoComponent]
})
export class RegiaoModule { }
