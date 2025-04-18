import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/users/users.service';
import { BaseServiceService } from '../../../../core/services/base-service.service';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../core/services/product.service';
import { CustomerService } from '../../../../core/services/customerservice';
import { DoughnutComponent } from '../../../../shared/components/charts/doughnut/doughnut.component';
import { AccordionModule } from 'primeng/accordion';
import { environment } from '../../../../../enviroments/environment';
import { NumberFormatPipe } from '../../../../core/pipes/number-formt';
import { DoughnutDynamicComponent } from "../../../../shared/components/charts/doughnut-dynamic/doughnut-dynamic.component";

const endpoint: any = environment.baseUrl;
const url = `${endpoint}/`;
@Component({
  selector: 'app-product',
  imports: [
    CardModule,
    CommonModule,
    HttpClientModule,
    AccordionModule,
    DoughnutComponent,
    NumberFormatPipe,
    DoughnutDynamicComponent
],
  providers: [
    UserService,
    BaseServiceService,
    MessageService,
    ProductService,
    CustomerService,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  title: string = '';
  labels: any = ['Ingresos', 'Gastos', 'Ahorros'];
  labelsDog: any = ['Ingresos %', 'Gastos %'];
  label: any = ['Fijo', 'Extra'];
  dataSource: any[] = [];
  dataChart: any[] = [];
  accounts: any[] = [];
  credit: any[] = [];
  total: any = {};
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
    });
    this.getDataSourceProducts()
  }

  getDataSourceProducts() {
    let baseUrl = url + 'product/' + this.userService.user?.uid;

    this.baseService.getItems(baseUrl).subscribe((res:any) => {
      this.dataSource = res.products;
      this.total = {totalFirst: res.totals.accounts, totalSecond: res.totals.credits};
      this.dataSource.filter((item:any) => {
        if (item.tipe === 'account') {
          this.accounts.push(item);
        } else if (item.tipe === 'credit') {
          this.credit.push(item);
        }
        this.setDataChart(this.accounts, this.credit);
      });
    });
  }

  setDataChart(accounts: any, credit: any) {
    this.dataChart = accounts.map((item:any) => {
      return {
        value: item.details.balance,
        color: '--p-yellow-200',
        hoverColor: '--p-yellow-300',
      };
    });
  }
}
