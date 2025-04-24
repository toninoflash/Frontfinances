import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-left',
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.scss'
})
export class MenuLeftComponent {

  @Input() menuItems: any[] = [

    { label: 'Mis datos', icon: 'pi pi-bolt', routerLink: ['/profile'] },
    { label: 'Mis obras', icon: 'pi pi-server', routerLink: ['/profile/artwaorks'] },
    { label: 'Mis favoritos', icon: 'pi pi-pencil', routerLink: 'dashboard' },
  ];
  @Input() title: string = ''; // Título del menú
}
