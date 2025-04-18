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
import { Customer, Representative, TableColumn } from '../../../core/interfaces';
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
import { BehaviorSubject } from 'rxjs';

import { SplitButtonModule } from 'primeng/splitbutton';
import { Router, RouterModule } from '@angular/router';
const endpoint: any = environment.baseUrl;
const url = `${endpoint}/`;

@Component({
  selector: 'app-reactive-table',
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
    FormsModule,
    TabsModule,
    NumberFormatPipe,
    SplitButtonModule,
    RouterModule
],
  templateUrl: './reactive-table.component.html',
  styleUrls: ['./reactive-table.component.scss'],
})
export class ReactiveTableComponent implements OnInit {
  hoveredRow: any = null;
  visible: boolean = false;

  private dataSourceSubject = new BehaviorSubject<any[]>([]);
  dataSource$ = this.dataSourceSubject.asObservable();

  @Input() columns: TableColumn[] = [];
  @Input() boton: any[] = [];
  @Input() dynamicGroup: any = 0;
  @Input() title: any = '';
  @Input() urlLink: any = '';
  customers!: Customer[];

  @Input()
  set dataSource(value: any[]) {
    this.dataSourceSubject.next(value);
  }

  constructor(private router: Router,
    private baseService:BaseServiceService) {}

  ngOnInit() {
    this.dataSource$.subscribe((data) => {
      console.log('dataSource updated:', data);
      this.customers = data.map((item) => {
        return Object.keys(item).reduce((formattedItem, key) => {
          const value = item[key];
          // Verifica si el valor es una fecha y formatea
          formattedItem[key] = this.isDate(value) ? Utils.formatDate(new Date(value)) : value;
          return formattedItem;
        }, {} as any);
      } );
    });
    console.table('Buton:', this.boton);
  }

  private isDate(value: any): boolean {
    // Verifica si el valor es un string o un objeto Date
    if (typeof value === 'string' || value instanceof Date) {
      const date = new Date(value);
      // Verifica si el objeto Date es válido
      return !isNaN(date.getTime());
    }
    return false; // No es una fecha válida
  }

  onRowSelect(event: any) {
    this.visible = true;
    console.log(event);
  }

  rowClass(product: any): string {
    return this.hoveredRow === product ? 'hovered-row' : 'table-row';
  }

  isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  sendUrl(item:any) {
    this.router.navigate([this.urlLink, item.id]);
  }
}
