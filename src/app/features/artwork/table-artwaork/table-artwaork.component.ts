import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TableComponent } from '../../../shared/components/table/table.component';
import { environment } from '../../../../enviroments/environment';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { FormsProfile } from '../../profile/models/forms';
import { User } from '../../../core/models/user';
import { Utils } from '../../../core/utils';
import { TableColumn } from '../../../core/interfaces';
const endpoint: any = environment.baseUrlSpring + 'users';

@Component({
  selector: 'app-table-artwaork',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent],
  providers: [UserService, BaseServiceService,MessageService],
  templateUrl: './table-artwaork.component.html',
  styleUrl: './table-artwaork.component.scss',
})
export class TableArtwaorkComponent {
  menuItems: any[] = [];
  globalFilterFields: any[] = [
    'name',
    'country.name',
    'representative.name',
    'status',
  ];
  //label: any[] = ['Name', 'Country', 'Agent', 'Status', 'Verified'];
  userLogin!: any;
  artist!: any;
  userIsLoged: boolean = false;
  visible: boolean = false;
  isLoading = false;
  //artworks: any[] = [];

  dynamicGroup: any = 0;
  dynamicForm: any;

  artworks = [
    {
      name: 'Artwork 1',
      representative: { name: 'Artist 1', image: 'avatar1.png' },
      status: 'approved',
      verified: true,
    },
  ];

  label = [
    { field: 'name', header: 'Name', width: '22%' },
    { field: 'artist.name', header: 'Artist', width: '22%' }, // ← Cambiado de "country" a "artist.name"
    { field: 'status', header: 'Status', width: '22%' },
    { field: 'published', header: 'Yo', width: '22%' }, // ← Cambiado de "verified" a "published"
  ];

  representatives = [
    { name: 'John Doe', image: 'avatar1.png' },
    { name: 'Jane Smith', image: 'avatar2.png' },
  ];

  statuses = [
    { value: 'approved' },
    { value: 'pending' },
    { value: 'rejected' },
  ];
  loading = false;
  dataLoaded = false;
  tableColumns: TableColumn[] = [];
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
      this.artist = this.userLogin;
      this.artworks = this.artist?.artWork as any[];
    } else if (uid) {
    }
    if (id && id === this.userLogin.id) {
      this.userIsLoged = true;
      this.artist = this.userLogin;
    } else if (id) {
    }

    this.menuItems = [
      {
        label: 'Datos',
        icon: 'pi pi-bolt',
        routerLink: ['/profile/' + this.userLogin?.id + '/arthist/'],
      },
      {
        label: 'Obras',
        icon: 'pi pi-image',
        expanded: false, // <-- para controlar visibilidad del submenu
        children: [
          {
            label: 'Galería',
            routerLink: '/profile/artwork/' + this.userLogin?.id + '/gallery/',
          },
          {
            label: 'Tabla',
            routerLink: '/profile/artwork/' + this.userLogin?.id + '/table',
          },
        ],
      },
      { label: 'Favoritos', icon: 'pi pi-pencil', routerLink: 'dashboard' },
    ];
    this.artworks = this.userLogin?.artWork as any[];
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

}
