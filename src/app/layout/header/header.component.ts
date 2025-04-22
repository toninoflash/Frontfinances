import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/users/users.service';
import { MenuTopComponent } from '../../shared/components/menu-top/menu-top.component';
import { Message } from 'primeng/message';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  providers: [UserService],
  imports: [
    ButtonModule,
    CommonModule,
    MenubarModule,
    PanelMenuModule,
    RouterModule,
    HttpClientModule,
    MenuTopComponent,
    Message
  ],
})
export class HeaderComponent implements OnInit {
  itemsSub: MenuItem[] | undefined;
  login: boolean = false;
  isDarkMode: boolean = false; // Variable para rastrear el estado del modo oscuro
  iconMode: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user ? (this.login = true) : (this.login = false);
    this.itemsSub = [
      {
        label: 'Cuentas',
        icon: 'pi pi-money-bill',
        items: [
          {
            label: 'Mis finanzas',
            icon: 'pi pi-bolt',
            routerLink: ['/dashboard'],
          },
          {
            label: 'Cuentas',
            icon: 'pi pi-server',
            routerLink: ['/account'],
          },
          {
            label: 'Transferencias',
            icon: 'pi pi-pencil',
            routerLink: 'dashboard',
          },
          {
            label: 'Mis tarjetas',
            icon: 'pi pi-palette',
            routerLink: 'dashboard',
          },
        ],
      },
      {
        label: 'Prestamos e Hipotecas',
        icon: 'pi pi-home',
        routerLink: ['/craditall'],
      },
      {
        label: 'Ahorros e inversiones',
        icon: 'pi pi-chart-line',
        items: [
          {
            label: 'Ahorro',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Inversión',
            icon: 'pi pi-server',
          },
        ],
      },
    ];
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    const isDarkMode = element?.classList.toggle('my-app-dark'); // Alterna la clase
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Guarda el estado en localStorage
    this.iconMode = isDarkMode || false
  }
}
