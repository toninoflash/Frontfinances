import { Component, Input, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { PanelMenu } from 'primeng/panelmenu';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-left',
  imports: [PanelMenu, RouterModule, CommonModule],
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.scss'
})
export class MenuLeftComponent {
@Input() items: MenuItem[] | undefined;

constructor(private router: Router) {}

  ngOnInit() {

  }

  isActive(routerLink: string): boolean {
    return this.router.url === routerLink;
  }
}
