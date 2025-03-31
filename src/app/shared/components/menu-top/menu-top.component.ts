import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menu-top',
  imports: [Menubar,CommonModule],
  templateUrl: './menu-top.component.html',
  styleUrl: './menu-top.component.scss'
})
export class MenuTopComponent {
  @Input() items: MenuItem[] | undefined;
  @Input() border:boolean = false
}
