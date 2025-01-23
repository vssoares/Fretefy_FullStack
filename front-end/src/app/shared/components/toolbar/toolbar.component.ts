import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ToolbarComponent implements OnInit {

  links = [
    { titulo: 'Home', href: '/home' },
    { titulo: 'Gestão de Regiões', href: '/gestao-regioes' },
  ]

  constructor() { }

  ngOnInit() {
  }

}
