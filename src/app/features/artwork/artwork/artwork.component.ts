import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { MenuLeftComponent } from "../../../shared/components/menu-left/menu-left.component";

@Component({
  selector: 'app-artwork',
  imports: [CommonModule, CardModule, AvatarModule, DividerModule, ButtonModule, PanelMenuModule, RouterModule, MenuModule, MenuLeftComponent],
  templateUrl: './artwork.component.html',
  styleUrl: './artwork.component.scss'
})
export class ArtworkComponent {
menuItems: any[] = [];

  constructor(private userService: UserService,
              private baseService: BaseServiceService, // Cambiado a RouterModule
  ) {}

  ngOnInit() {
    this.menuItems = [

          { label: 'Galería', icon: 'pi pi-bolt', routerLink: 'gallery' },
          { label: 'Tabla', icon: 'pi pi-server', routerLink: 'table' },
          { label: 'Estadísticas', icon: 'pi pi-pencil', routerLink: 'dashboard' },
    ];
  }
}
