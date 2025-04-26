import { Component, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
type SeverityType = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined;
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    InputTextModule,
    MultiSelectModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    DropdownModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() loading: boolean = false;
  @Input() label: any[] = [];
  @Input() representatives: any[] = [];
  @Input() statuses: any[] = [];

  get globalFilterFields(): string[] {
    return this.label.map(col => col.field);
  }

  clear(table: Table) {
    table.clear();
  }

  getColumnType(field: string): string {
    if (field === 'verified') return 'boolean';
    if (field === 'status') return 'status';
    if (field === 'country') return 'country';
    if (field === 'representative') return 'representative';
    return 'text';
  }

  getSeverity(status: string): SeverityType {
    if (!status) return undefined;

    const statusLower = status.toLowerCase();

    switch (statusLower) {
      case 'approved':
      case 'active':
      case 'success':
        return 'success';
      case 'pending':
        return 'warn'; // Nota: PrimeNG usa 'warn' no 'warning'
      case 'rejected':
      case 'inactive':
      case 'error':
        return 'danger';
      case 'new':
        return 'info';
      case 'renewal':
        return 'secondary';
      default:
        return undefined;
    }
  }
}
