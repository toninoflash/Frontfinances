import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DoughnutComponent } from '../../../../shared/components/charts/doughnut/doughnut.component';
import { ActivatedRoute } from '@angular/router';
import { FormsIncomesBills } from '../incomes-bills/models/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../enviroments/environment';
import { UserService } from '../../../../core/services/users/users.service';
import { BaseServiceService } from '../../../../core/services/base-service.service';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../core/services/product.service';
import { CustomerService } from '../../../../core/services/customerservice';
import { IncomesBillsConstans } from '../incomes-bills/models/constans';
import { CustomDatePipe } from '../../../../core/pipes/custom-date-pipe';
import { ValueToLabelPipe } from '../../../../core/pipes/value-to-label';
import { NumberFormatPipe } from '../../../../core/pipes/number-formt';
import { BasicComponent } from '../../../../shared/components/charts/basic/basic.component';
import { StackedbarComponent } from '../../../../shared/components/charts/stackedbar/stackedbar.component';
import { Utils } from '../../../../core/utils';
const endpoint: any = environment.baseUrl;
const url = `${endpoint}/`;
@Component({
  selector: 'app-finances',
  imports: [
    CardModule,
    CommonModule,
    CustomDatePipe,
    ValueToLabelPipe,
    NumberFormatPipe,
    HttpClientModule,
    DoughnutComponent,
    StackedbarComponent,
  ],
  providers: [
    UserService,
    BaseServiceService,
    MessageService,
    ProductService,
    CustomerService,
  ],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss',
})
export class FinancesComponent {
  title: string = '';
  mothActually:string = '';
  mothPass:string = '';
  dataSource: any[] = [];
  incomes: any;
  bills: any;
  saving: any;
  dynamicUpdateGroup: any = FormsIncomesBills.updateGroup;
  public incomesBillsConstans = IncomesBillsConstans;
  labels: any = ['Ingresos', 'Gastos', 'Ahorros'];
  labelsDog: any = ['Ingresos %', 'Gastos %'];
  label: any = ['Fijo', 'Extra'];
  dataChart: any = {};
  difference:any = {}
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private baseService: BaseServiceService,
    private messageService: MessageService,
    private productService: ProductService,
    private customerService: CustomerService
  ) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title = data['title'];
      console.log('Título de la ruta:', this.title);
    });
    this.mothPass = Utils.paintMothActuallity(true);
    this.mothActually = Utils.paintMothActuallity();
    this.getDataSourceMov();
    this.getDataSourceMovTotal();
  }

  getDataSourceMov() {
    let baseUrl = url + 'movement/user/' + this.userService.user?.uid;
    this.baseService.getItems(baseUrl).subscribe({
      next: (resp: any) => {
        console.log('Data:', resp);
        this.dataSource = resp.movements;
        this.difference = {total:resp.difference.total, percentage: resp.difference.percentage};
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }
  getDataSourceMovTotal() {
    let baseUrl = url + 'movement/total/' + this.userService.user?.uid;
    this.baseService.getItems(baseUrl).subscribe({
      next: (resp: any) => {
        this.dataChart =
          {
            fixedMovements: resp.fixedMovements,
            extraMovements: resp.extraMovements,
            fixedBills: resp.fixedBills,
            extraBills: resp.extraBills,
            totalMovement: resp.totalMovement,
            totalBills: resp.totalBills,
            total: resp.total,
            totalMovementPer: resp.percentages.totalMovement,
            totalBillsPer: resp.percentages.totalBills,
          }
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }
}
