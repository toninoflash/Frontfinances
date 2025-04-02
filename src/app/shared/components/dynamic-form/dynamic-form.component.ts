import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormData } from '../../../core/interfaces';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButton } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    SelectModule,
    DropdownModule,
    DatePickerModule,
    CheckboxModule,
    InputNumberModule,
    DividerModule
  ],
})
export class DynamicFormComponent {
  @Input() formData!: FormData;
  @Input() title: string = 'title';
  @Input() alert: boolean = false;

  formGroup!: FormGroup;
  @Output() formGroupChange = new EventEmitter<FormGroup>();
  hide = true;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit() {
    this.buildForm();
    console.log('Formulario inicializado:', this.formGroup.value);
    this.formGroupChange.emit(this.formGroup);
  }

  private buildForm(): void {
    if (this.formData && Array.isArray(this.formData.data)) {
      this.formData.data.forEach((field) => {
        if (!field.name) return;

        // Inicialización del valor
        const value =
          field.type === 'checkbox' ? field.value || false : field.value || '';
        const disabled = field.disabled || false;

        // Configuración de validadores
        const validators = field.required ? [Validators.required] : [];

        // Añadir el control al formGroup
        this.formGroup.addControl(
          field.name,
          this.fb.control({ value, disabled }, validators)
        );

        // Configurar visibilidad condicional (showWen)
        this.handleConditionalVisibility(field);

        // Aplicar configuraciones específicas
        if (field.grid) {
          field.fullWidth = true; // Marcar para CSS dinámico
        }
      });
    } else {
      console.error('formData.data is undefined or not an array');
    }
  }

  private handleConditionalVisibility(field: any): void {
    if (field.showWen) {
      const controlToWatch = this.formGroup.get(field.showWen.name!);

      // Subscribirse a cambios del control de referencia
      controlToWatch?.valueChanges.subscribe((value) => {
        field.hidden = this.evaluateVisibilityCondition(field, value);
      });

      // Condición inicial
      field.hidden = this.evaluateVisibilityCondition(
        field,
        controlToWatch?.value
      );
    }
  }

  private evaluateVisibilityCondition(field: any, value: any): boolean {
    if (Array.isArray(field.selectionValueShowWen)) {
      return !field.selectionValueShowWen.includes(value);
    }
    return value == null || value === '';
  }

  onDateInput(event: Event, fieldName?: string): void {
    const input = event.target as HTMLInputElement;
    this.formGroup.get(fieldName!)?.setValue(input.value);
  }
}
