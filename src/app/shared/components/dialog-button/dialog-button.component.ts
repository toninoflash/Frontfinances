import { HttpClientModule } from '@angular/common/http';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { Router } from 'express';
import { FormsAuth } from '../../../features/auth/models/forms';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
@Component({
  selector: 'app-dialog-button',
  imports: [Dialog, ButtonModule, InputTextModule, DynamicFormComponent,
    HttpClientModule

  ],
  providers: [UserService, BaseServiceService],
  templateUrl: './dialog-button.component.html',
  styleUrl: './dialog-button.component.scss'
})
export class DialogButtonComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  @Input() dynamicGroup: any = 0;
  @Input() title: any = '';
  @Output() onSubmit = new EventEmitter<any>();
  dynamicForm: any;

  constructor(

  ) {}
  ngOnInit(): void {
  }
  onFormGroupChange(formGroup: FormGroup) {
    this.dynamicForm = formGroup;
    this.onFormCreated(this.dynamicForm);
  }
  onFormCreated = (form: any) => {
    this.ifValueChange(form);
    this.setValuesDefault(form);
    this.setValidatorFormsStatic(form);
  };
  setValidatorFormsStatic(
    form: FormGroup,
  ) {
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
}
