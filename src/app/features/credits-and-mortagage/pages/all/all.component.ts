import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { environment } from '../../../../../enviroments/environment';
import { CarruselComponent } from '../../../../shared/components/carrusel/carrusel.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form.component';
import { TabsModule } from 'primeng/tabs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { Message } from 'primeng/message';
import { UserService } from '../../../../core/services/users/users.service';
import { BaseServiceService } from '../../../../core/services/base-service.service';
import { ProductService } from '../../../../core/services/product.service';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Utils } from '../../../../core/utils';
import { Trasanction } from '../../../../core/models/transaction';
import { Income } from '../../../../core/models/income';
import { FormsIncomesBills } from '../../../dashboard/pages/incomes-bills/models/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../core/services/customerservice';
import { FormsAccount } from '../../../account/models/forms';
import { StepsModule } from 'primeng/steps';
import { Slider } from 'primeng/slider';
import { InputNumber } from 'primeng/inputnumber';
import { NumberFormatPipe } from '../../../../core/pipes/number-formt';
import { debounceTime, Subject } from 'rxjs';
import { ProgressSpinner } from 'primeng/progressspinner';
import { FormsCredit } from '../../models/forms';
import { SelectButton } from 'primeng/selectbutton';
const endpoint: any = environment.baseUrl;
const url = `${endpoint}/`;
@Component({
  selector: 'app-all',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    Toast,
    DynamicFormComponent,
    HttpClientModule,
    TabsModule,
    Toast,
    FormsModule,
    MultiSelectModule,
    TableComponent,
    CommonModule,
    StepsModule,
    Slider,
    InputNumber,
    ReactiveFormsModule,
    NumberFormatPipe,
    ProgressSpinner,
    SelectButton

  ],
  providers: [UserService, BaseServiceService, MessageService, ProductService],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent {
  title: string = '';
  visible: boolean = false;
  account: any = true;
  userLogin: any;
  items: MenuItem[] | undefined;


  border: boolean = true;
  dynamicForm: any;
  dynamicGroup: any = 0;
  dynamicUpdateGroup: any = FormsIncomesBills.updateGroup;
  dataSource: any[] = [];

  selectedItems: any[] = []; //filtro
  selectedCategories: any[] = []; //filtro
  selectedPeriodos: any[] = []; //filtro
  filteredDataSource: any[] = []; // Para almacenar los datos filtrados
  categories: MegaMenuItem[] | undefined;
  periodos: MegaMenuItem[] | undefined;

  isCreated:boolean= false;
  value!: number; //Formulario
  interest: number = 0; //Formulario
  cuota!: number; //Formulario
  spinner:boolean = true
  data:any = {}
  private valueChangeSubject: Subject<number> = new Subject<number>(); // Subject para manejar los cambios del slider de valor
  private interestChangeSubject: Subject<number> = new Subject<number>(); // Subject para manejar los cambios del slider de interés
  selectedCuota: string | null = null;
  activeIndex: number = 0;
  stateOptions: any[] = [];
  accountAsigned: any[] = []
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private baseService: BaseServiceService,
    private messageService: MessageService,
    private productService: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.dynamicGroup = FormsCredit.createGroup;
    this.userLogin = this.userService.user;
    this.route.data.subscribe((data) => {
      this.title = data['title'];
      console.log('Título de la ruta:', this.title);
    });

    this.items = [
      {
          label: 'Simular',
      },
      {
          label: 'Solicitar',
      },
      {
          label: 'Confirmar',
      },
  ];
  // Configura el debounce para el Subject de 'value'
  this.valueChangeSubject.pipe(debounceTime(1000)).subscribe((newValue) => {
    this.makeApiCall(newValue, this.interest);
  });

  // Configura el debounce para el Subject de 'interest'
  this.interestChangeSubject.pipe(debounceTime(1000)).subscribe((newInterest) => {
    this.makeApiCall(this.value, newInterest);
  });
  this.onStateOptions()
  }

  // Método que se llama cuando el slider cambia
  onValueChange(newValue: number) {
    this.spinner = true; // Activa el spinner
    this.value = newValue; // Actualiza el valor local
    this.valueChangeSubject.next(newValue); // Emite el nuevo valor al Subject
  }
// Método que se llama cuando el slider o input de 'interest' cambia
onInterestChange(newInterest: number) {
  this.spinner = true; // Activa el spinner
  this.interest = newInterest; // Actualiza el interés local
  this.interestChangeSubject.next(newInterest); // Emite el nuevo interés al Subject
}
  // Lógica para realizar la llamada al servidor
  private makeApiCall(value: number, interest: number) {
    const urlBase = url + 'credit/calculate';
    const item = { value, interest };
    this.spinner = true; // Activa el spinner

    this.baseService.postItem(urlBase, item).subscribe({
      next: (resp: any) => {
        console.log('Respuesta del servidor:', resp);
         // Desactiva el spinner
        setTimeout(() => {
          this.spinner = false;
          this.data.six = resp.data.six
          this.data.nine = resp.data.nine
          this.data.twelve = resp.data.twelve
          this.data.eighteen = resp.data.eighteen
          this.data.total = resp.data.total
        }, 1000);
      },
      error: (err: any) => {
        console.error('Error en la llamada al servidor:', err);
        setTimeout(() => {
          this.spinner = false;
        }, 1000);
      },
    });
  }

  onStateOptions() {
    const urlBase = url + 'account/'+ this.userLogin.uid;
    this.baseService.getItems(urlBase).subscribe((resp:any) => {
      resp.accounts.forEach((element:any) => {
        this.stateOptions.push({label:element.name,value:element.id})
      });

    });
  }
  // Método para seleccionar una cuota
  selectCuota(cuota: number, cuotaKey: string) {
    this.cuota = cuota;
    this.selectedCuota = cuotaKey; // Guarda la celda seleccionada
  }
// Método para avanzar al siguiente paso
nextStep() {
  if (this.activeIndex < this.items!.length - 1) {
    this.activeIndex++;
  }
}
  onFormGroupChange(formGroup: FormGroup) {
    this.dynamicForm = formGroup;
  }
  onFormCreated = (form: any) => {
    this.ifValueChange(form);
    this.setValuesDefault(form);
    this.setValidatorFormsStatic(form);
  };
  setValidatorFormsStatic(form: FormGroup) {
    const controls = form.controls;
  }
  setValuesDefault(form: FormGroup) {
    const controls = form.controls;
  }
  ifValueChange(form: FormGroup) {
    const controls = form.controls;
  }
  onSubmitForm() {

  }

  getDataSource() {
    let baseUrl = url + 'account/' + this.userLogin.uid;
    this.baseService.getItems(baseUrl).subscribe({
      next: (resp: any) => {
        console.log('Data:', resp);
        this.dataSource = resp.accounts;
        this.productService.dataSource = this.dataSource;
      },
      error: (err: any) => {
        console.error('Error:', err);
      },
    });
  }

  filterDataSource() {
    this.customerService.dataSource = this.dataSource;
    this.filteredDataSource = this.customerService.dataSource.filter((item:any) => {
      const matchesItems =
        this.selectedItems.length === 0 ||
        this.selectedItems.includes(item.tipe);
      const matchesCategories =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(item.category);

      const matchesPeriodos =
        this.selectedPeriodos.length === 0 ||
        this.isWithinPeriod(item.createAt);

      return matchesItems && matchesCategories && matchesPeriodos;
    });
    this.customerService.dataSource = this.filteredDataSource;
  }

  isWithinPeriod(createAt: string): boolean {
    if (this.selectedPeriodos.length === 0) {
      return true; // Si no hay periodos seleccionados, no se aplica el filtro
    }

    const date = new Date(createAt); // Convierte la fecha de `createAt` a un objeto Date
    const now = new Date(); // Fecha actual

    // Itera sobre los periodos seleccionados
    for (const periodo of this.selectedPeriodos) {
      switch (periodo) {
        case '1': // Mismo mes
          if (
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth()
          ) {
            return true;
          }
          break;
        case '2': // Últimos 3 meses
          const threeMonthsAgo = new Date(now);
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          if (date >= threeMonthsAgo && date <= now) {
            return true;
          }
          break;
        case '3': // Últimos 6 meses
          const sixMonthsAgo = new Date(now);
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          if (date >= sixMonthsAgo && date <= now) {
            return true;
          }
          break;
        case '4': // Últimos 12 meses
          const twelveMonthsAgo = new Date(now);
          twelveMonthsAgo.setMonth(now.getMonth() - 12);
          if (date >= twelveMonthsAgo && date <= now) {
            return true;
          }
          break;
        case '5': // Último año
          if (date.getFullYear() === now.getFullYear()) {
            return true;
          }
          break;
      }
    }

    return false; // Si no coincide con ningún periodo, devuelve false
  }
  submitCredit() {
    this.nextStep()
    let baseUrl = url+'credit/paintCredit'

    const item = {balance:this.value,interest:this.interest,amount:this.cuota, uid: this.userLogin.uid, accountId: this.accountAsigned}
    // Aquí puedes realizar la lógica para enviar el formulario

    this.baseService.postItem(baseUrl, item).subscribe({
      next: (resp: any) => {
        this.setValuesDefault(resp);
      },
      error: (err: any) => {
        console.error('Error al registrar el ingreso:', err);

      },
    });
  }
  submitForm() {
    let event = this.dynamicForm.value as Income
    let baseUrl = url+'transaction'
    console.log('Formulario enviado:', event);

    // Aquí puedes realizar la lógica para enviar el formulario
    let trasanction: Trasanction = event as Trasanction;
    trasanction.uid = this.userService.user?.uid as string;
    trasanction.accountId = this.account.id;
    if (event.tipe === '1' && event.event === '1') {
      trasanction.category = '2';
    } else if (event.tipe === '1' && event.event !== '1') {
      trasanction.category = '1';
    } else if (event.tipe !== '1' && event.event === '1') {
      trasanction.category = '4';
    } else if (event.tipe !== '1' && event.event !== '1') {
      trasanction.category = '3';
    }
    this.baseService.postItem(baseUrl, trasanction).subscribe({
      next: (resp: any) => {
        this.isCreated = true
        Utils.showMessage(
          this.messageService,
          'success',
          'Success',
          'El registrado con exito.'
        );
        this.ngOnInit();
        setTimeout(() => {
          this.dynamicForm.reset()
          this.isCreated = false;
        }, 3000);
      },
      error: (err: any) => {
        console.error('Error al registrar el ingreso:', err);
        Utils.showMessage(
          this.messageService,
          'error',
          'Error',
          'Error en el registro. Inténtalo de nuevo.'
        );
      },
    });
  }
}
