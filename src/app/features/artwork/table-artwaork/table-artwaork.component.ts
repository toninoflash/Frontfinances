import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {
  ColumnConfig,
  TableComponent,
} from '../../../shared/components/table/table.component';
import { environment } from '../../../../enviroments/environment';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { FormsProfile } from '../../profile/models/forms';
import { User } from '../../../core/models/user';
import { Utils } from '../../../core/utils';
import { TableColumn } from '../../../core/interfaces';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Dialog } from 'primeng/dialog';
import { Menubar } from 'primeng/menubar';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { FileupComponent } from '../../../shared/components/fileup/fileup.component';

import { FileUpload, UploadEvent } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { FormsArtwork } from '../models/forms';
import { Toast } from 'primeng/toast';
const endpoint: any = environment.baseUrlSpring + 'users';

@Component({
  selector: 'app-table-artwaork',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableComponent,
    ButtonModule,
    Menubar,
    Dialog,
    DynamicFormComponent,
    FileUpload,
    CommonModule,
    ProgressSpinner,
    Toast
  ],
  providers: [UserService, BaseServiceService, MessageService],
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

  artworks: any[] = [];

  artworkColumns: ColumnConfig[] = [
    { field: 'imageUrl', header: 'Imagen', width: '120px', type: 'image' },
    { field: 'title', header: 'Título', type: 'text', filterType: 'text' },
    { field: 'category', header: 'Categoría', type: 'tag' },
  ];
  label = [
    { field: 'title', header: 'Titulo', width: '22%' },
    { field: 'imageUrl', header: 'Obra', width: '22%' }, // ← Cambiado de "country" a "artist.name"
    { field: 'status', header: 'Status', width: '22%' },
    { field: 'category', header: 'Categoría', width: '22%' }, // ← Cambiado de "verified" a "published"
  ];

  statuses = [
    { value: 'approved' },
    { value: 'pending' },
    { value: 'rejected' },
  ];

  loading = false;
  dataLoaded = false;
  tableColumns: TableColumn[] = [];

  previewImageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
    private messageService: MessageService,
    private route: ActivatedRoute,

    private router: Router
  ) {}

  ngOnInit() {
    this.dynamicGroup = FormsArtwork.createGroup;
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
    this.getUser();
    this.menuItems = [
      {
        label: 'Nueva',
        icon: 'pi pi-plus',
        command: () => {
          this.showDialog();
        },
      },
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

  getUser() {
    const url = endpoint + '/full/' + this.userLogin?.id;
    this.baseService.getItems(url).subscribe(
      (resp: any) => {
        this.artist = resp as User;
        this.userIsLoged = false;
        this.artworks = this.artist?.artWork as any[];
      },
      (error: any) => {
        Utils.showMessage(
          this.messageService,
          'error',
          'Error',
          'No se ha podido cargar el artista'
        );
      }
    );
  }

  onUpload() {
    if (!this.selectedFile) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No file selected' });
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.baseService
      .postItemImage(`${environment.baseUrlSpring}artwork/image`, formData)
      .subscribe(
        (response: any) => {
          console.log('Imagen subida:', response.url);
          this.createArtwork(response.url);
        },
        (error) => {
          console.error('Error subiendo la imagen', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al subir imagen',
          });
        }
      );

  }
  previewImage: string | ArrayBuffer | null = null;

  onSelectFile(event: any) {
    this.isLoading = true;
    const file = event.files[0]; // toma el primer archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = reader.result;
        this.isLoading = false;
      };
      reader.readAsDataURL(file); // lo convierte a base64 para mostrar en el <img>
    }
    this.selectedFile=file
  }

  clearPreview() {
    this.previewImage = null;
  }


  createArtwork(imageUrl: string) {
    if (this.dynamicForm.valid) {
    const url = `${environment.baseUrlSpring}artwork`;
    this.isLoading = true;
    let artwork:any = null;
    artwork= this.dynamicForm.value;
    artwork.imageUrl = imageUrl;
    artwork.uid = this.userLogin.id;

    this.baseService.postItem(url, artwork).subscribe(
      (resp) => {
        Utils.showMessage(
          this.messageService,
          'info',
          'Info',
          'Obra creada correctamente'
        );
        this.visible = false;
        this.isLoading = false;
        this.getUser();
      },
      (error) => {
        Utils.showMessage(
          this.messageService,
          'error',
          'Error',
          'No se ha podido crear la obra'
        );
        this.isLoading = false;
      }
    );
  }
}
}
