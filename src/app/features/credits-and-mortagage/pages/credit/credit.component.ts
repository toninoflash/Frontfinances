import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/users/users.service';
import { BaseServiceService } from '../../../../core/services/base-service.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ProductService } from '../../../../core/services/product.service';
import { CustomerService } from '../../../../core/services/customerservice';
import { FormsCredit } from '../../models/forms';
import { environment } from '../../../../../enviroments/environment';
import { NumberFormatPipe } from '../../../../core/pipes/number-formt';
import { Card } from 'primeng/card';
import { CustomDatePipe } from '../../../../core/pipes/custom-date-pipe';
import { Menu } from 'primeng/menu';
import { AccordionModule } from 'primeng/accordion';
import { MenuLeftComponent } from '../../../../shared/components/menu-left/menu-left.component';
const endpoint: any = environment.baseUrl;
const url = `${endpoint}/credit`;
@Component({
  selector: 'app-credit',
  imports: [
    NumberFormatPipe,
    Card,
    CustomDatePipe,
    AccordionModule,
    Menu
  ],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.scss',
})
export class CreditComponent {
  title: string = '';
  userLogin: any = null;
  dynamicForm: any;
  dynamicGroup: any = 0;
  credit: any = 0;
  account: any = 0;
  items: MenuItem[] | undefined;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private baseService: BaseServiceService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dynamicGroup = FormsCredit.createGroup;
    this.userLogin = this.userService.user;
    this.route.data.subscribe((data) => {
      this.title = data['title'];
    });

    this.items = [
      {
          label: 'Documents',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-plus'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-search'
              }
          ]
      },
  ];

    this.getDataCredit(id)
  }

  getDataCredit(id: any) {
    const endpoint = `${url}/get/${id}`;
    this.baseService.getItems(endpoint).subscribe((res: any) => {
      if (res) {
        this.credit = res.credit;
        this.account = res.account;
      }
    } );
  }
}
