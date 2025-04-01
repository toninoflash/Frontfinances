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
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.querySelector('html')?.classList.add('my-app-dark'); // Aplica el tema oscuro
      this.isDarkMode = true; // Actualiza el estado de la variable
      this.iconMode = this.isDarkMode
    }
    this.itemsSub = [
      {
        label: 'Cuentas',
        icon: 'pi pi-money-bill',
        items: [
          {
            label: 'Mis finanzas',
            icon: 'pi pi-bolt',
            url: '/dashboard',
          },
          {
            label: 'Cuentas',
            icon: 'pi pi-server',
            url: '/account',
          },
          {
            label: 'Transferencias',
            icon: 'pi pi-pencil',
            url: '/dashboard',
          },
          {
            label: 'Mis tarjetas',
            icon: 'pi pi-palette',
            url: '/dashboard',
          },
        ],
      },
      {
        label: 'Prestamos e Hipotecas',
        icon: 'pi pi-home',
        url: '/craditall',
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
