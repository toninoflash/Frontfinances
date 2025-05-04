import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Tag, TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Select, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Toast, ToastModule } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButton } from 'primeng/radiobutton';
import { InputNumber } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
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
  imports: [TableModule, ButtonModule, Ripple, SelectModule, ToastModule, ToolbarModule, InputTextModule, TextareaModule, CommonModule, FileUpload, DropdownModule, Tag, RadioButton, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges{
  @Input() dataSource: any[] = [];
  @Input() loading: boolean = false;
  @Input() label: any[] = [];
  @Input() statuses: any[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Output() selectedChange = new EventEmitter<any[]>();
  @Output() editChange = new EventEmitter<any>();
  @Output() deleteChange = new EventEmitter<any>();
  selectedItems: any[] = [];
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

  filterGlobal(event: Event, table: Table): void {
    const input = event.target as HTMLInputElement;
  table.filterGlobal(input.value, 'contains');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      console.log('⚡ dataSource ha cambiado:', this.dataSource);
    }

  }
  emitSelectedRows(selected: any[]) {
    this.selectedItems = selected;
    this.selectedChange.emit(selected);
  }

  onEdit(rowData: any) {
    this.editChange.emit(rowData);

  }
  onDelete(rowData: any) {
    this.deleteChange.emit(rowData);
  }

}
