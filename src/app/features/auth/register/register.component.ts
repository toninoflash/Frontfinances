import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinner } from 'primeng/progressspinner';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { Card } from 'primeng/card';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { Router } from '@angular/router';
import { FormsAuth } from '../models/forms';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../enviroments/environment';
const endpoint: any = environment.baseUrlSpring+"/api/";

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
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
    this.dynamicGroup = FormsAuth.registerGroup;
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

  register() {
    const url: string = `${endpoint}/user`;
    this.spinner = true;
    this.error = false;

    if (this.dynamicForm.valid) {
      let user = this.dynamicForm.value;
      user.createAt= new Date();
      this.baseService.postItem(url, user).subscribe(
        (resp: any) => {
          this.userService.user = resp;
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
