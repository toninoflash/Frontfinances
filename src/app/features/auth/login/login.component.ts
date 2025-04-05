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
const endpoint: any = environment.baseUrl;

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    ProgressSpinner,
    DynamicFormComponent,
    HttpClientModule,
    Card
  ],
  providers: [UserService, BaseServiceService],
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
    private router:Router
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

  login() {
    let loginUser: any;
    const url: string = `${endpoint}/users`;
    this.spinner = true;
    this.error = false;

    if (this.dynamicForm.valid) {
      loginUser = this.dynamicForm.value;
      this.userService.login(loginUser).subscribe(
        (resp: any) => {
          this.userService.user = resp.usuario;
          this.spinner = false;
          this.router.navigate(['/dashboard']);

        },
        (error) => {

          this.error = true;
          this.spinner = false;
        }
      );
    }
  }
}
