import { BaseServiceService } from './../../../core/services/base-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsAuth } from '../models/forms';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { environment } from '../../../../enviroments/environment';
import { UserService } from '../../../core/services/users/users.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { User } from '../../../core/models/user';
import { FormTestComponent } from "../../../shared/components/form-test/form-test.component";
import { Utils } from '../../../core/utils';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { firstValueFrom } from 'rxjs';
const endpoint: any = environment.baseUrlSpring+"users";

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    ProgressSpinner,
    DynamicFormComponent,
    HttpClientModule,
    Card,
    Toast
],
  providers: [UserService, BaseServiceService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  dynamicGroup: any = 0;
  dynamicForm: any;

  spinner: boolean = false;
  error: boolean = false;
  upImg = 0;
  file: any = '';
  uploadedImageUrl: string | null = null;
  test: string = '';

  constructor(
    private userService: UserService,
    private baseService: BaseServiceService,
    private router: Router,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {
    this.dynamicGroup = FormsAuth.loginGroup;
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
    credit: boolean = false,
    mov: boolean = false
  ) {
    const controls = form.controls;
  }
  setValuesDefault(form: FormGroup) {
    const controls = form.controls;
  }
  ifValueChange(form: FormGroup) {
    const controls = form.controls;
  }

  async login(id: string): Promise<void> {
    if (!this.dynamicForm.valid) return;

    const loginUser = this.dynamicForm.value;
    const url = `${endpoint}/validate`;

    this.spinner = true;
    this.error = false;

    try {
      const validationRes = await firstValueFrom(this.baseService.getItemsWithParams(url, loginUser));

      if (!validationRes) {
        this.handleError('No se ha podido encontrar el usuario');
        return;
      }

      const loginRes: any = await firstValueFrom(this.userService.login(loginUser));

      this.userService.user = validationRes as User;
      sessionStorage.setItem('token', loginRes.access_token);
      this.router.navigate([`/dashboard/${this.userService.user?.id}/arthist`]);

    } catch (error) {
      this.handleError('Error al validar o iniciar sesión');
    } finally {
      this.spinner = false;
    }
  }

  private handleError(message: string): void {
    Utils.showMessage(this.messageService, 'error', 'Error', message);
    this.error = true;
  }

}
