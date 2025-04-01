import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CustomDatePipe } from '../../../../core/pipes/custom-date-pipe';
import { ValueToLabelPipe } from '../../../../core/pipes/value-to-label';
import { NumberFormatPipe } from '../../../../core/pipes/number-formt';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/users/users.service';
import { BaseServiceService } from '../../../../core/services/base-service.service';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../core/services/product.service';
import { CustomerService } from '../../../../core/services/customerservice';
import { DoughnutComponent } from '../../../../shared/components/charts/doughnut/doughnut.component';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-product',
  imports: [
    CardModule,
    CommonModule,
    CustomDatePipe,
    ValueToLabelPipe,
    NumberFormatPipe,
    HttpClientModule,
    AccordionModule,
    DoughnutComponent
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
  dataChart: any = {};
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
  }
}
