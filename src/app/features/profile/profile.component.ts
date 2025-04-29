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
import { Subscription } from 'rxjs';
import { ProgressSpinner } from 'primeng/progressspinner';
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
    GalleryComponentComponent,
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [UserService, MessageService],
})
export class ProfileComponent {
  private routeSubscription!: Subscription;
  menuItems: any[] = [];
  userLogin!: any;
  artist!: any;
  userIsLogged: boolean = false;
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

  ) {}

  ngOnInit() {


// Suscripción a cambios de ruta
this.routeSubscription = this.route.paramMap.subscribe(params => {
  this.initializeUserData();
    this.initializeMenu();
});
  }
  ngOnDestroy(): void {
    // Importante: limpiar la suscripción
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  private initializeUserData(): void {
    this.dynamicGroup = FormsProfile.updateGroup;
    this.userLogin = this.userService.user;
    const id = this.getRouteParam('id');
    const uid = this.getRouteParam('uid');

    if (uid && this.isCurrentUser(uid)) {
      this.handleCurrentUser();
    } else if (uid) {
      this.fetchUser(uid);
    }

    if (id && this.isCurrentUser(id)) {
      this.handleCurrentUser();
    } else if (id) {
      this.fetchUser(id);
    }
  }
  private fetchUser(id: number): void {
    this.baseService.getItems(`${endpoint}/full/${id}`).subscribe({
      next: (response) => this.handleUserFetchSuccess(response),
      error: () => this.handleUserFetchError()
    });
  }
  private handleUserFetchSuccess(response: any): void {
    this.artist = response as User;
    this.artworks = this.artist?.artWork || [];
    this.initializeMenu();
  }

  private handleUserFetchError(): void {
    Utils.showMessage(
      this.messageService,
      'error',
      'Error',
      'No se ha podido cargar el artista'
    );
  }
  private getRouteParam(param: string): number | null {
    const paramValue = this.route.snapshot.paramMap.get(param);
    return paramValue ? Number(paramValue) : null;
  }
  private isCurrentUser(id: number): boolean {
    return !!this.userLogin && id === this.userLogin.id;
  }
  private handleCurrentUser(): void {
    this.userIsLogged = true;
    this.artist = this.userLogin;
    this.userService.user = this.artist;
    this.fetchUser(this.artist.id);
  }
  private initializeMenu(): void {
    if (!this.artist) return;

    if(this.userIsLogged){
      this.menuItems = [
        {
          label: 'Datos',
          icon: 'pi pi-bolt',
          routerLink: [`/profile/${this.artist.id}/arthist`],
        },
        {
          label: 'Obras',
          icon: 'pi pi-image',
          expanded: false,
          children: [
            {
              label: 'Galería',
              routerLink: `/profile/artwork/${this.artist.id}/gallery/${this.artist.id}`,
            },
            {
              label: 'Gestión',
              routerLink: `/profile/artwork/${this.artist.id}/table`,
            },
          ],
        },
        {
          label: 'Favoritos',
          icon: 'pi pi-pencil',
          routerLink: 'dashboard'
        },
      ];
    } else {
      this.menuItems = [
        {
          label: 'Datossss',
          icon: 'pi pi-bolt',
          routerLink: [`/profile/${this.artist.id}/arthist`],
        },
        {
          label: 'Obras',
          icon: 'pi pi-image',
          expanded: false,
          children: [
            {
              label: 'Galería',
              routerLink: `/profile/artwork/${this.artist.id}/gallery/${this.artist.id}`,
            },
          ],
        },
        {
          label: 'Favoritos',
          icon: 'pi pi-pencil',
          routerLink: 'dashboard'
        },
      ];
    }

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
        this.userService.user = this.userLogin;
        this.artist = this.userLogin;
        setTimeout(() => {
          this.visible = false;
        this.isLoading = false;
        Utils.showMessage(
          this.messageService,
          'success',
          'Exito',
          'Usuario actualizado correctamente'
        );
        }, 1000);
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
}
