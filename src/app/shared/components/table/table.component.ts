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
import { Select } from 'primeng/select';
type SeverityType = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined;

export interface ColumnConfig {
  field: string;
  header: string;
  width?: string;
  type: 'text' | 'image' | 'status' | 'tag' | 'boolean';
  filterType?: 'text' | 'status' | 'boolean'; // Opcional: solo para columnas filtrables
}

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
    Select
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() loading: boolean = false;
  @Input() label: any[] = [];
  @Input() statuses: any[] = [];
  @Input() columns: ColumnConfig[] = [];
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

  // Opciones para el filtro de estado
  statusOptions = ['PÚBLICO', 'PRIVADO', 'BORRADOR'];

  // Función para determinar el color del tag según el estado
  getStatusSeverity(status: string): SeverityType {
    switch (status?.toUpperCase()) {
      case 'PÚBLICO':
        return 'success';
      case 'PRIVADO':
        return 'warn';
      case 'BORRADOR':
        return 'danger';
      default:
        return 'info';
    }
  }

  // Función para abrir vista previa de imagen (opcional)
  openImagePreview(imageUrl: string) {
    // Implementar lógica para mostrar imagen en modal/dialog
    console.log('Abrir imagen:', imageUrl);
  }

  // Limpiar filtros
  clearFilters(table: Table) {
    table.clear();
  }

  getGlobalFilterFields(): string[] {
    return this.columns ? this.columns.map(col => col.field) : [];
  }
  filterGlobal(event: Event, table: Table): void {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }
}
