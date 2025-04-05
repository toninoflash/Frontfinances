import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CustomerService } from '../../../core/services/customerservice';
import { Customer, Representative } from '../../../core/interfaces';
import { CustomDatePipe } from '../../../core/pipes/custom-date-pipe';
import { ValueToLabelPipe } from '../../../core/pipes/value-to-label';
import { IncomesBillsConstans } from '../../../features/dashboard/pages/incomes-bills/models/constans';
import { NumberFormatPipe } from '../../../core/pipes/number-formt';
import { Dialog } from 'primeng/dialog';
import { DialogButtonComponent } from '../dialog-button/dialog-button.component';
import { Toast } from 'primeng/toast';
import { FormGroup, FormsModule } from '@angular/forms';
import { FormsIncomesBills } from '../../../features/dashboard/pages/incomes-bills/models/forms';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormsAuth } from '../../../features/auth/models/forms';

import { TabsModule } from 'primeng/tabs';
import { DoughnutComponent } from "../charts/doughnut/doughnut.component";
import { BasicComponent } from '../charts/basic/basic.component';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { environment } from '../../../../enviroments/environment';
import { Utils } from '../../../core/utils';

const endpoint: any = environment.baseUrl;
const url = `${endpoint}/`;


@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    HttpClientModule,
    CommonModule,
    CustomDatePipe,
    ValueToLabelPipe,
    NumberFormatPipe,
    Dialog,
    FormsModule,
    DynamicFormComponent,
    TabsModule,
],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  hoveredRow: any = null;
  visible: boolean = false;
  @Input() dynamicGroup: any = 0;
  @Input() title: any = '';
  @Output() onSubmit = new EventEmitter<any>();
  dynamicForm: any;
  dynamicFormMov: any;

  public incomesBillsConstans = IncomesBillsConstans;
  @Input() dataSource: any[] = [];
  dataSourceSub: any[] = [];
  customers!: Customer[];
  customersSub!: Customer[];
  customersSecond!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private customerService: CustomerService,
    private baseService:BaseServiceService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios en dataSource
    this.customerService.dataSource$.subscribe((customers) => {
      this.customers = customers;
      this.loading = false;

      // Formatear las fechas
      this.customers.forEach(
        (customer) => (customer.createAt = new Date(<Date>customer.createAt))
      );
    });
    // Suscribirse a los cambios en dataSource
    this.customerService.dataSourceSub$.subscribe((customers) => {
      this.customersSub = customers;
      this.loading = false;

      // Formatear las fechas
      this.customersSub.forEach(
        (customer) => (customer.createAt = new Date(<Date>customer.createAt))
      );
    });
    // Suscribirse a los cambios en dataSource
    this.customerService.dataSourceSecond$.subscribe((customers) => {
      this.customersSecond = customers;
      this.loading = false;

      // Formatear las fechas
      this.customersSecond.forEach(
        (customer) => (customer.createAt = new Date(<Date>customer.createAt))
      );
    });
  }
  ngOnChanges() {
  }
  clear(table: Table) {
    table.clear();
  }
  onRowSelect(event: any) {
    this.visible = true;
    console.log(event);
    // Asignar los valores del evento a los controles de dynamicForm
    if (this.dynamicForm && this.dynamicForm.controls) {
      this.getCustomerSub(event.trasactionId)
      Object.keys(event).forEach((key) => {
        if (this.dynamicForm.controls[key]) {
          this.dynamicForm.controls[key].setValue(event[key]);
        }
        if(key === 'createAt')
        {
          this.dynamicForm.controls[key].setValue(Utils.formatDate(event[key]));
        }
      });
    }
  }
  rowClass(product: any): string {
    return this.hoveredRow === product ? 'hovered-row' : 'table-row';
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
    this.onSubmit.emit(this.dynamicForm.value);
    this.visible = false;
    this.dynamicForm.reset();
  }

  getCustomerSub(trasactionId:any) {
    const baseUrl = url + 'movement/trans/' + trasactionId;
    this.baseService.getItems(baseUrl).subscribe((resp:any) => {
      this.customerService.dataSourceSub = resp.movements;
      this.customersSub = resp.movements
      this.ngOnInit()
    })
  }
}
