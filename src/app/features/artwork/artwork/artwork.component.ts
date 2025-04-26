import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { MenuLeftComponent } from "../../../shared/components/menu-left/menu-left.component";
import { User } from '../../../core/models/user';
import { environment } from '../../../../enviroments/environment';
const endpoint: any = environment.baseUrlSpring + 'users';


@Component({
  selector: 'app-artwork',
  imports: [CommonModule, CardModule, AvatarModule, DividerModule, ButtonModule, PanelMenuModule, RouterModule, MenuModule, MenuLeftComponent],
  templateUrl: './artwork.component.html',
  styleUrl: './artwork.component.scss'
})
export class ArtworkComponent {
menuItems: any[] = [];

userLogin!: any;
  userIsLoged: boolean = false;
  arthish:User | null = null;

  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
    private route: ActivatedRoute,

    private router:Router
  ) {}

  ngOnInit() {

    this.userLogin = this.userService.user;
    const id = Number(this.route.snapshot.paramMap.get('uid'));
    if (id && id === this.userLogin?.id) {
      this.userIsLoged = true;
      this.menuItems = [
        {
          label: 'Datos',
          icon: 'pi pi-bolt',
          routerLink: ['/profile/' + this.userLogin?.id+'/arthist/'],
        },
        {
          label: 'Obras',
          icon: 'pi pi-image',
          expanded: false, // <-- para controlar visibilidad del submenu
          children: [
            {
              label: 'Galería',
              routerLink: '/profile/artwork/' + this.userLogin?.id+'/gallery/',
            },
            {
              label: 'Tabla',
              routerLink: '/profile/artwork/' + this.userLogin?.id+'/table',
            },
          ],
        },
        { label: 'Favoritos', icon: 'pi pi-pencil', routerLink: 'dashboard' },
      ];
    }

  }


}
