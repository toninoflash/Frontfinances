import { UserService } from './../../../core/services/users/users.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-menu-left',
  imports: [RouterModule, CommonModule, AvatarModule],
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.scss'
})
export class MenuLeftComponent implements OnInit {
  userLogged: any = null; // Usuario logueado
  @Input() user: any; // Estado de inicio de sesión

  @Input() menuItems: any[] = [];
  @Input() title: string = ''; // Título del menú
  constructor(private userService: UserService) {
    // Constructor vacío
  }
  ngOnInit(): void {
    this.userLogged = this.userService.user;
  }


}
