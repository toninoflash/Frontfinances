import { HttpClientModule } from '@angular/common/http';
import { BaseServiceService } from './../../../../core/services/base-service.service';
import { UserService } from './../../../../core/services/users/users.service';
import { MegaMenuItem, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ActivatedRoute } from '@angular/router';
import { DialogButtonComponent } from '../../../../shared/components/dialog-button/dialog-button.component';
import { FormsIncomesBills } from './models/forms';
import { Income } from '../../../../core/models/income';
import { environment } from '../../../../../enviroments/environment';
import { Toast } from 'primeng/toast';
import { Utils } from '../../../../core/utils';
import { IncomesBillsConstans } from './models/constans';
import { CustomerService } from '../../../../core/services/customerservice';
import { FormsModule } from '@angular/forms';
import { NumberFormatPipe } from '../../../../core/pipes/number-formt';

const endpoint: any = environment.baseUrl;
const url = `${endpoint}/incomes`;

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-incomes-bills',
  imports: [
    CardModule,
    MultiSelectModule,
    ButtonModule,
    TableComponent,
    DialogButtonComponent,
    HttpClientModule,
    Toast,
    FormsModule,
    NumberFormatPipe
  ],
  providers: [UserService, BaseServiceService, MessageService, CustomerService],
  templateUrl: './incomes-bills.component.html',
  styleUrl: './incomes-bills.component.scss',
})
export class IncomesBillsComponent implements OnInit {
  items: MegaMenuItem[] | undefined;
  categories: MegaMenuItem[] | undefined;
  periodos: MegaMenuItem[] | undefined;
  dynamicGroup: any = FormsIncomesBills.createGroup;
  dynamicUpdateGroup: any = FormsIncomesBills.updateGroup;

  dataSource: any[] = [];
  selectedItems: any[] = [];//filtro
  selectedCategories: any[] = [];//filtro
  selectedPeriodos: any[] = []; //filtro
  filteredDataSource: any[] = []; // Para almacenar los datos filtrados
  fixedIncomes:number = 0;
  extraIncomes:number = 0;
  fixedBills:number = 0;
  extraBills:number = 0;
  totalIncome:number = 0;
  totalBills:number = 0;
  title: string = '';
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private baseService: BaseServiceService,
    private messageService: MessageService,
    private customerService: CustomerService
  ) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title = data['title'];
    });
    this.items = [
      [
        {
          label: 'Movimientos',
          items: [
            {
              label: 'Ingresos',
              checked: false, // Estado inicial del checkbox
              command: () => {
                console.log('Ingresos seleccionados:');
              },
            },
            {
              label: 'Gastos',
              checked: false, // Estado inicial del checkbox
              command: () => {
                console.log('Ingresos seleccionados:');
              },
            },
            {
              label: 'No computables',
              checked: false, // Estado inicial del checkbox
              command: () => {
                console.log('Ingresos seleccionados:');
              },
            },
          ],
        },
      ],
    ];
    this.items = IncomesBillsConstans.tipo.option;
    this.categories = IncomesBillsConstans.category.option;
    this.periodos = IncomesBillsConstans.periody.option;

    this.getDataSource();
    this.getDataTotal()
  }

  submitForm(event: any) {
    console.log('Formulario enviado:', event);
    // Aquí puedes realizar la lógica para enviar el formulario
    let income: Income = event as Income;
    income.uid = this.userService.user?.uid as string;
    if (event.tipe === '1' && event.event === '1') {
      income.category = '2';
    } else if (event.tipe === '1' && event.event !== '1') {
      income.category = '1';
    } else if (event.tipe !== '1' && event.event === '1') {
      income.category = '4';
    } else if (event.tipe !== '1' && event.event !== '1') {
      income.category = '3';
    }
    this.baseService.postItem(url, income).subscribe({
      next: (resp: any) => {
        Utils.showMessage(
          this.messageService,
          'success',
          'Success',
          'El registrado con exito.'
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
  }

  getDataSource() {
    let baseUrl = url+'/'+this.userService.user?.uid;
    this.baseService.getItems(baseUrl).subscribe({
      next: (resp: any) => {
        this.dataSource = resp.incomes;
        this.customerService.dataSource = this.dataSource;
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }
  getDataTotal() {
    let baseUrl = url+'/total/'+this.userService.user?.uid;
    this.baseService.getItems(baseUrl).subscribe({
      next: (resp: any) => {
        this.fixedIncomes=resp.fixedIncomes;
        this.extraIncomes=resp.extraIncomes;
        this.fixedBills=resp.fixedBills;
        this.extraBills=resp.extraBills;
        this.totalIncome=resp.totalIncome;
        this.totalBills=resp.totalBills;
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }
  filterDataSource() {
    console.log('Selected Items:', this.selectedItems);
  console.log('Selected Categories:', this.selectedCategories);
  console.log('Selected Periodos:', this.selectedPeriodos);
  this.customerService.dataSource = this.dataSource;
    this.filteredDataSource = this.customerService.dataSource.filter((item) => {
      const matchesItems =
        this.selectedItems.length === 0 || this.selectedItems.includes(item.tipe);
      const matchesCategories =
        this.selectedCategories.length === 0 || this.selectedCategories.includes(item.createAt);

        const matchesPeriodos = this.selectedPeriodos.length === 0 || this.isWithinPeriod(item.createAt);

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
}
