import { Component, Input, OnInit } from '@angular/core';
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
    Dialog
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  hoveredRow: any = null;
  visible: boolean = false;
  public incomesBillsConstans = IncomesBillsConstans;
  @Input() dataSource: any[] = [];
  customers!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private customerService: CustomerService) {}

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
  }

  clear(table: Table) {
    table.clear();
  }
  onRowSelect(event: any) {
    this.visible = true;
    console.log(event);
  }
  rowClass(product: any): string {
    return this.hoveredRow === product ? 'hovered-row' : 'table-row';
  }
}
