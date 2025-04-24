import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/users/users.service';
import { BaseServiceService } from '../../core/services/base-service.service';
import { environment } from '../../../enviroments/environment';
import { MenuModule } from 'primeng/menu';
import { MenuLeftComponent } from '../../shared/components/menu-left/menu-left.component';
import { User } from '../../core/models/user';

import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicFormComponent } from "../../shared/components/dynamic-form/dynamic-form.component";
import { FormsAuth } from '../auth/models/forms';
import { FormGroup } from '@angular/forms';
import { FormsProfile } from './models/forms';
const endpoint: any = environment.baseUrlSpring + 'users';
@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    DividerModule,
    ButtonModule,
    PanelMenuModule,
    RouterModule,
    MenuModule,
    MenuLeftComponent,
    InputTextModule,
    Dialog,
    DynamicFormComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [UserService],
})
export class ProfileComponent {
  menuItems: any[] = [];
  resp!: User;
  visible: boolean = false;


  dynamicGroup: any = 0;
  dynamicForm: any;

  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
    private router:Router
  ) {}

  ngOnInit() {
    this.dynamicGroup = FormsProfile.updateGroup;
    this.resp = this.userService.user as User;
    this.menuItems = [
      { label: 'Mis datos', icon: 'pi pi-bolt', routerLink: ['/profile'] },
      {
        label: 'Mis obras',
        icon: 'pi pi-server',
        routerLink: ['/profile/artwaorks'],
      },
      { label: 'Mis favoritos', icon: 'pi pi-pencil', routerLink: 'dashboard' },
    ];
  }
  onFormGroupChange(formGroup: FormGroup) {
    this.dynamicForm = formGroup;
    this.onFormCreated(this.dynamicForm);
  }
  onFormCreated = (form: any) => {
    this.ifValueChange(form);
    this.setValuesDefault(form);
    this.setValidatorFormsStatic(form);
  };
  setValidatorFormsStatic(
    form: FormGroup,
    credit: boolean = false,
    mov: boolean = false
  ) {
    const controls = form.controls;
  }
  setValuesDefault(form: FormGroup) {
    const controls = form.controls;
  }
  ifValueChange(form: FormGroup) {
    const controls = form.controls;
  }
    showDialog() {
        this.visible = true;
    }
}
