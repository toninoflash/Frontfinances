import { HttpClientModule } from '@angular/common/http';
import { BaseServiceService } from './../../../../core/services/base-service.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DoughnutComponent } from '../../../../shared/components/charts/doughnut/doughnut.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ActivatedRoute } from '@angular/router';
import { CarruselComponent } from '../../../../shared/components/carrusel/carrusel.component';

import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { FormsAccount } from '../../models/forms';
import { User } from '../../../../core/models/user';
import { Account } from '../../../../core/models/account';
import { Utils } from '../../../../core/utils';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { environment } from '../../../../../enviroments/environment';
import { Toast } from 'primeng/toast';
import { ProductService } from '../../../../core/services/product.service';
import { UserService } from '../../../../core/services/users/users.service';
import { MenuBigComponent } from '../../../../shared/components/menu-big/menu-big.component';
import { MenuTopComponent } from '../../../../shared/components/menu-top/menu-top.component';
import { TabsModule } from 'primeng/tabs';
import { CustomerService } from '../../../../core/services/customerservice';
import { NumberFormatPipe } from '../../../../core/pipes/number-formt';
import { IncomesBillsConstans } from '../../../dashboard/pages/incomes-bills/models/constans';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogButtonComponent } from '../../../../shared/components/dialog-button/dialog-button.component';
import { FormsIncomesBills } from '../../../dashboard/pages/incomes-bills/models/forms';
import { Table, TableModule } from 'primeng/table';
import { Income } from '../../../../core/models/income';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/message';
import { Trasanction } from '../../../../core/models/transaction';
const endpoint: any = environment.baseUrl;
const url = `${endpoint}/`;
@Component({
  selector: 'app-myaccounts',
  imports: [
    CardModule,
    CarruselComponent,
    Dialog,
    ButtonModule,
    InputTextModule,
    Toast,
    DynamicFormComponent,
    HttpClientModule,
    TabsModule,
    Toast,
    FormsModule,
    MultiSelectModule,
    TableComponent,
    CommonModule,
    Message,
  ],
  providers: [UserService, BaseServiceService, MessageService, ProductService],
  templateUrl: './myaccounts.component.html',
  styleUrl: './myaccounts.component.scss',
})
export class MyaccountsComponent {
  title: string = '';
  visible: boolean = false;
  account: any = true;
  userLogin: any;
  border: boolean = true;
  dynamicForm: any;
  dynamicGroup: any = 0;
  dynamicUpdateGroup: any = FormsIncomesBills.updateGroup;
  dynamicTransGroup: any = FormsIncomesBills.createGroup;
  dynamicTransUpdateGroup: any = FormsIncomesBills.updateGroup;
  dataSource: any[] = [];
  dataSourceMov: any[] = [];

  selectedItems: any[] = []; //filtro
  selectedCategories: any[] = []; //filtro
  selectedPeriodos: any[] = []; //filtro
  filteredDataSource: any[] = []; // Para almacenar los datos filtrados
  fixedIncomes: number = 0;
  extraIncomes: number = 0;
  fixedBills: number = 0;
  extraBills: number = 0;
  totalIncome: number = 0;
  totalBills: number = 0;
  categories: MegaMenuItem[] | undefined;
  periodos: MegaMenuItem[] | undefined;
  itemsMov: MegaMenuItem[] | undefined;

  isCreated:boolean= false;
  items = [
    {
      label: 'Registrar nueva transanción',
      icon: 'pi pi-calendar',
      route: 'account',
    },
    {
      label: 'Ver movmientos',
      icon: 'pi pi-arrow-right-arrow-left',
      route: 'account',
    },
    {
      label: 'Hacer transferencía',
      icon: 'pi pi-cart-arrow-down ',
      route: 'products',
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private baseService: BaseServiceService,
    private messageService: MessageService,
    private productService: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.dynamicGroup = FormsAccount.createGroup;
    this.userLogin = this.userService.user;
    this.route.data.subscribe((data) => {
      this.title = data['title'];
      console.log('Título de la ruta:', this.title);
    });
    this.itemsMov = IncomesBillsConstans.tipo.option;
    this.categories = IncomesBillsConstans.category.option;
    this.periodos = IncomesBillsConstans.periody.option;

    this.getDataSource();
    this.getDataSourceMov();

  }

  openDialog(event: any) {
    console.log('Formulario enviado:', event);
    if (event === 'new') {
      this.visible = true;
    } else {
      this.account = event;
      this.getDataSourceMov();

    }
  }

  onFormGroupChange(formGroup: FormGroup) {
    this.dynamicForm = formGroup;
  }
  onFormCreated = (form: any) => {
    this.ifValueChange(form);
    this.setValuesDefault(form);
    this.setValidatorFormsStatic(form);
  };
  setValidatorFormsStatic(form: FormGroup) {
    const controls = form.controls;
  }
  setValuesDefault(form: FormGroup) {
    const controls = form.controls;
  }
  ifValueChange(form: FormGroup) {
    const controls = form.controls;
  }
  onSubmitForm() {
    let account: Account = this.dynamicForm.value as Account;
    let baseUrl = url+'account'

    account.uid = this.userService.user?.uid as string;
    this.baseService.postItem(baseUrl, account).subscribe({
      next: (resp: any) => {
        Utils.showMessage(
          this.messageService,
          'success',
          'Perfecto!!',
          'El registrado con éxito.'
        );
        this.ngOnInit();
      },
      error: (err: any) => {
        console.error('Error al registrar el ingreso:', err);
        Utils.showMessage(
          this.messageService,
          'error',
          'Error',
          'Error en el registro. Inténtalo de nuevo.'
        );
      },
    });
    this.visible = false;
    this.dynamicForm.reset();
  }

  getDataSource() {
    let baseUrl = url + 'account/' + this.userLogin.uid;
    this.baseService.getItems(baseUrl).subscribe({
      next: (resp: any) => {
        console.log('Data:', resp);
        this.dataSource = resp.accounts;
        this.productService.dataSource = this.dataSource;
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }
  getDataSourceMov() {
    let baseUrl = url + 'movement/' + this.account.id;
    this.baseService.getItems(baseUrl).subscribe({
      next: (resp: any) => {
        console.log('Data:', resp);
        this.dataSourceMov = resp.movements;
        this.customerService.dataSource = this.dataSourceMov;
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }
  // getDataTotal() {
  //   let baseUrl = url + 'account/total/' + this.userService.user?.uid;
  //   this.baseService.getItems(baseUrl).subscribe({
  //     next: (resp: any) => {
  //       this.fixedIncomes = resp.fixedIncomes;
  //       this.extraIncomes = resp.extraIncomes;
  //       this.fixedBills = resp.fixedBills;
  //       this.extraBills = resp.extraBills;
  //       this.totalIncome = resp.totalIncome;
  //       this.totalBills = resp.totalBills;
  //     },
  //     error: (err: any) => {
  //       console.error('Error:', err);
  //     },
  //   });
  // }
  filterDataSource() {
    this.customerService.dataSource = this.dataSourceMov;
    this.filteredDataSource = this.customerService.dataSource.filter((item) => {
      const matchesItems =
        this.selectedItems.length === 0 ||
        this.selectedItems.includes(item.tipe);
      const matchesCategories =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(item.category);

      const matchesPeriodos =
        this.selectedPeriodos.length === 0 ||
        this.isWithinPeriod(item.createAt);

      return matchesItems && matchesCategories && matchesPeriodos;
    });
    this.customerService.dataSource = this.filteredDataSource;
  }
  filterDataSourceMov() {
    this.customerService.dataSource = this.dataSourceMov;
    this.filteredDataSource = this.customerService.dataSource.filter((item) => {
      const matchesItems =
        this.selectedItems.length === 0 ||
        this.selectedItems.includes(item.tipe);
      const matchesCategories =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(item.category);

      const matchesPeriodos =
        this.selectedPeriodos.length === 0 ||
        this.isWithinPeriod(item.createAt);

      return matchesItems && matchesCategories && matchesPeriodos;
    });
    this.customerService.dataSource = this.filteredDataSource;
  }

  isWithinPeriod(createAt: string): boolean {
    if (this.selectedPeriodos.length === 0) {
      return true; // Si no hay periodos seleccionados, no se aplica el filtro
    }

    const date = new Date(createAt); // Convierte la fecha de `createAt` a un objeto Date
    const now = new Date(); // Fecha actual

    // Itera sobre los periodos seleccionados
    for (const periodo of this.selectedPeriodos) {
      switch (periodo) {
        case '1': // Mismo mes
          if (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth()
          ) {
            return true;
          }
          break;
        case '2': // Últimos 3 meses
          const threeMonthsAgo = new Date(now);
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          if (date >= threeMonthsAgo && date <= now) {
            return true;
          }
          break;
        case '3': // Últimos 6 meses
          const sixMonthsAgo = new Date(now);
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          if (date >= sixMonthsAgo && date <= now) {
            return true;
          }
          break;
        case '4': // Últimos 12 meses
          const twelveMonthsAgo = new Date(now);
          twelveMonthsAgo.setMonth(now.getMonth() - 12);
          if (date >= twelveMonthsAgo && date <= now) {
            return true;
          }
          break;
        case '5': // Último año
          if (date.getFullYear() === now.getFullYear()) {
            return true;
          }
          break;
      }
    }

    return false; // Si no coincide con ningún periodo, devuelve false
  }

  submitForm() {
    let event = this.dynamicForm.value as Income
    let baseUrl = url+'transaction'
    console.log('Formulario enviado:', event);

    // Aquí puedes realizar la lógica para enviar el formulario
    let trasanction: Trasanction = event as Trasanction;
    trasanction.uid = this.userService.user?.uid as string;
    trasanction.accountId = this.account.id;
    if (event.tipe === '1' && event.event === '1') {
      trasanction.category = '2';
    } else if (event.tipe === '1' && event.event !== '1') {
      trasanction.category = '1';
    } else if (event.tipe !== '1' && event.event === '1') {
      trasanction.category = '4';
    } else if (event.tipe !== '1' && event.event !== '1') {
      trasanction.category = '3';
    }
    this.baseService.postItem(baseUrl, trasanction).subscribe({
      next: (resp: any) => {
        this.isCreated = true
        Utils.showMessage(
          this.messageService,
          'success',
          'Success',
          'El registrado con exito.'
        );
        this.ngOnInit();
        setTimeout(() => {
          this.dynamicForm.reset()
          this.isCreated = false;
        }, 3000);
      },
      error: (err: any) => {
        console.error('Error al registrar el ingreso:', err);
        Utils.showMessage(
          this.messageService,
          'error',
          'Error',
          'Error en el registro. Inténtalo de nuevo.'
        );
      },
    });
  }
}
