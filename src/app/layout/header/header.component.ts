import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/users/users.service';
import { Menu } from 'primeng/menu';
import { Dialog } from 'primeng/dialog';

import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { BaseServiceService } from '../../core/services/base-service.service';
import { environment } from '../../../enviroments/environment';
import { User } from '../../core/models/user';

const endpoint: any = environment.baseUrlSpring + 'users';

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
    Menu,
    Dialog,
    IconField,
    InputIcon,
    InputTextModule,
  ],
})
export class HeaderComponent implements OnInit {
  itemsOption: MenuItem[] | undefined;
  itemsUser: MenuItem[] | undefined;
  isLogin: boolean = false;
  isDarkMode: boolean = false; // Variable para rastrear el estado del modo oscuro
  iconMode: boolean = false; // Estado actual del modo oscuro (true = oscuro, false = claro)

  constructor(
    private userService: UserService,
    private baseService: BaseServiceService
  ) {}

  ngOnInit() {
    this.userService.user ? (this.isLogin = true) : (this.isLogin = false);

    // Inicializar los íconos del menú de usuario
    if(this.isLogin) {
      this.itemsUser = [
        {
          label: 'Perfil',
          icon: 'pi pi-money-bill',
          items: [
            { label: 'Mis datos', icon: 'pi pi-bolt', routerLink: ['/profile/'+this.userService.user!.id+'/arthist'] },
            {
              label: 'Mis obras',
              icon: 'pi pi-server',
              routerLink: ['/profile//artwork/'+this.userService.user!.id+'/gallery/'+this.userService.user!.id],
            },
            {
              label: 'Mis favoritos',
              icon: 'pi pi-pencil',
              routerLink: 'dashboard',
            },
          ],
        },
      ];
    }


    // Inicializar los íconos del menú de opciones
    this.itemsOption = [
      {
        label: 'Tema',
        icon: 'pi pi-money-bill',
        items: [
          {
            label: this.getLabel(this.iconMode),
            icon: this.getIcon(this.iconMode), // Cambia el ícono según el estado del modo oscuro
            command: () => this.toggleDarkMode(), // Cambia el estado del modo oscuro
          },
        ],
      },
    ];
  }

  // Método para alternar entre modo oscuro y claro
  toggleDarkMode() {
    const element = document.querySelector('html');
    this.iconMode = !this.iconMode; // Alterna el estado del modo oscuro
    const isDarkMode = element?.classList.toggle('my-app-dark'); // Alterna la clase
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Guarda el estado en localStorage

    // Actualiza los íconos y las etiquetas después de cambiar el modo
    this.updateIconsAndLabels();
  }

  // Función para devolver el ícono según el estado de iconMode
  getIcon(iconMode: boolean): string {
    return iconMode ? 'pi pi-sun' : 'pi pi-moon'; // Cambia el ícono según el modo
  }

  // Función para devolver la etiqueta según el estado de iconMode
  getLabel(iconMode: boolean): string {
    return iconMode ? 'Light' : 'Dark'; // Cambia la etiqueta según el modo
  }

  // Actualiza los íconos y las etiquetas en el menú de opciones basado en el estado actual del modo
  updateIconsAndLabels() {
    if (this.itemsOption) {
      this.itemsOption[0].items!.forEach((item) => {
        // Actualiza tanto el ícono como la etiqueta
        item.icon = this.getIcon(this.iconMode);
        item.label = this.getLabel(this.iconMode);
      });
    }
  }

  isLoading = false;

  guardar() {
    this.isLoading = true;
    const net = endpoint + '/1';

    // Simula una espera
    setTimeout(() => {
      this.baseService.getItems(net).subscribe(
        (res) => {
          this.userService.user = res as User;
          this.isLogin = true;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
      // aquí podrías mostrar un mensaje de éxito o redirigir
    }, 2000);
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
