import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../layout/breadcrumb/breadcrumb.component";
import { SidebarModule } from 'primeng/sidebar';
import {  PanelMenuModule } from 'primeng/panelmenu';
@Component({
  selector: 'app-features',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, BreadcrumbComponent,
    SidebarModule,  // Asegúrate de importar SidebarModule
    PanelMenuModule, ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  sidebarVisible: boolean = false;  // Estado inicial del Sidebar (oculto)

  // Elementos del menú lateral
  sideMenuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Cuentas',
      icon: 'pi pi-wallet',
      routerLink: '/account'
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      routerLink: '/settings'
    }
  ];

  // Método para alternar la visibilidad del Sidebar
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
