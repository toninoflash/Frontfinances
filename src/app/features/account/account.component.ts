import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MenuLeftComponent } from '../../shared/components/menu-left/menu-left.component';
import { MenuTopComponent } from '../../shared/components/menu-top/menu-top.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-account',
  imports: [RouterOutlet ,MenuLeftComponent, MenuTopComponent, CommonModule, ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent  implements OnInit {
  title: string = '';
  items: MenuItem[] | undefined;
  isMenuVisible: boolean = false;
  page:number=0;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Mis cuentas',
        icon: 'pi pi-file',
        route: 'account',
      },
      {
        label: 'Transferencias',
        icon: 'pi pi-shopping-cart',
        route: 'products',
      },
    ];
    this.route.data.subscribe((data) => {
      this.title = data['title'];
      console.log('Título de la ruta:', this.title);
    });
  }
}
