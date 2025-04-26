import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/users/users.service';
import { BaseServiceService } from '../../core/services/base-service.service';
import { environment } from '../../../enviroments/environment';
import { MenuModule } from 'primeng/menu';
import { MenuLeftComponent } from '../../shared/components/menu-left/menu-left.component';
import { User } from '../../core/models/user';

import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicFormComponent } from '../../shared/components/dynamic-form/dynamic-form.component';
import { FormsAuth } from '../auth/models/forms';
import { FormGroup } from '@angular/forms';
import { FormsProfile } from './models/forms';
import { Toast } from 'primeng/toast';
import { Utils } from '../../core/utils';
import { GalleryComponentComponent } from "../../shared/components/gallery-component/gallery-component.component";
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
    DynamicFormComponent,
    Toast,
    GalleryComponentComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [UserService, MessageService],
})
export class ProfileComponent {
  menuItems: any[] = [];
  userLogin!: any;
  artist!: any;
  userIsLoged: boolean = false;
  visible: boolean = false;
  isLoading = false;
  artworks: any[] = [];

  dynamicGroup: any = 0;
  dynamicForm: any;

  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
    private messageService: MessageService,
    private route: ActivatedRoute,

    private router: Router
  ) {}

  ngOnInit() {
    this.dynamicGroup = FormsProfile.updateGroup;
    this.userLogin = this.userService.user;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const uid = Number(this.route.snapshot.paramMap.get('uid'));

    if (uid && uid === this.userLogin.id) {
      this.userIsLoged = true;
      this.artist= this.userLogin;
      this.artworks = this.artist?.artWork as any[];
    } else if (uid){
      this.getUser(uid);
    }
    if (id && id === this.userLogin.id) {
      this.userIsLoged = true;
      this.artist= this.userLogin;
    } else if (id){
      this.getUser(id);
    }
    this.menuItems = [
      {
        label: 'Datos',
        icon: 'pi pi-bolt',
        routerLink: ['/profile/' + this.artist?.id+'/arthist/'],
      },
      {
        label: 'Obras',
        icon: 'pi pi-image',
        expanded: false, // <-- para controlar visibilidad del submenu
        children: [
          {
            label: 'Galería',
            routerLink: '/profile/artwork/' + this.artist?.id+'/gallery/',
          },
          {
            label: 'Tabla',
            routerLink: '/profile/artwork/' + this.artist?.id+'/table',
          },
        ],
      },
      { label: 'Favoritos', icon: 'pi pi-pencil', routerLink: 'dashboard' },
    ];
    this.artworks = this.artist?.artWork as any[];


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
    this.dynamicForm.patchValue(this.userLogin);
  }

  update() {
    const url = endpoint + '/' + this.userService.user!.id;
    this.userLogin.name = this.dynamicForm.value.name;
    this.userLogin.lastname = this.dynamicForm.value.lastname;
    this.userLogin.bio = this.dynamicForm.value.bio;
    this.userLogin.direction = this.dynamicForm.value.direction;
    this.userLogin.phone = this.dynamicForm.value.phone;
    this.userLogin.website = this.dynamicForm.value.website;
    this.isLoading = true;
    this.baseService.putItem(url, this.userLogin).subscribe(
      (resp) => {
        this.userLogin = resp as User;
        Utils.showMessage(
          this.messageService,
          'info',
          'Info',
          'Usuario actualizado correctamente'
        );
        this.visible = false;
        this.isLoading = false;
        this.userService.user = this.userLogin;
      },
      (error) => {
        Utils.showMessage(
          this.messageService,
          'error',
          'Error',
          'No se ha podido actualizar el usuario'
        );
        this.isLoading = false;
      }
    );
  }
  getUser(id: number) {
    const url = endpoint + '/' + id;
    this.baseService.getItems(url).subscribe(
      (resp:any) => {
        this.artist = resp as User;
        this.userIsLoged = false;
        this.artworks = this.artist?.artWork as any[];
      },
      (error:any) => {
        Utils.showMessage(
          this.messageService,
          'error',
          'Error',
          'No se ha podido cargar el artista'
        );
      }
    );
  }
}
