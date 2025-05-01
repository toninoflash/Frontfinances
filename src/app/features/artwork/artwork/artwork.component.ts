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
import { MenuLeftComponent } from '../../../shared/components/menu-left/menu-left.component';
import { User } from '../../../core/models/user';
import { environment } from '../../../../enviroments/environment';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { FormsProfile } from '../../profile/models/forms';
import { Utils } from '../../../core/utils';
const endpoint: any = environment.baseUrlSpring + 'users';

@Component({
  selector: 'app-artwork',
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
  ],
  templateUrl: './artwork.component.html',
  styleUrl: './artwork.component.scss',
  providers: [UserService, MessageService],
})
export class ArtworkComponent {
  private routeSubscription!: Subscription;
  menuItems: any[] = [];
  userLogin!: any;
  userIsLoged: boolean = false;
  artworks: any[] = [];
  artist!: any;
  userIsLogged: boolean = false;

  dynamicGroup: any = 0;
  dynamicForm: any;

  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Suscripción a cambios de ruta
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.initializeUserData();
      this.initializeMenu();
    });
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
      error: () => this.handleUserFetchError(),
    });
  }
  ngOnDestroy(): void {
    // Importante: limpiar la suscripción
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
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
    this.fetchUser(this.artist.id);
  }
  private initializeMenu(): void {
    if (!this.artist) return;

    this.menuItems = Utils.setItemMenu(this.userLogin, true);
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
}
