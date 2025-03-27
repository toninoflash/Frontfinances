import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/users/users.service';
import { MenuTopComponent } from '../../shared/components/menu-top/menu-top.component';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    providers: [UserService],
    imports: [ButtonModule, CommonModule,MenubarModule, PanelMenuModule,RouterModule, HttpClientModule, MenuTopComponent ]
})
export class HeaderComponent implements OnInit {
  itemsSub: MenuItem[] | undefined;
login:boolean=false;

constructor(
  private userService: UserService,
) {}

  ngOnInit() {
      this.userService.user?this.login=true:this.login=false;

      this.itemsSub = [
        {
            label: 'Cuentas',
            icon: 'pi pi-money-bill',
            items: [
              {
                  label: 'Mis finanzas',
                  icon: 'pi pi-bolt',
                  url:'/dashboard'
              },
              {
                  label: 'Ingresos y gastos',
                  icon: 'pi pi-server',
                  url:'/dashboard'
              },
              {
                  label: 'Mis productos',
                  icon: 'pi pi-pencil',
                  url:'/dashboard'
              },
              {
                  label: 'Mis tarjetas',
                  icon: 'pi pi-palette',
                  url:'/dashboard'
              }
          ]
        },
        {
            label: 'Prestamos e Hipotecas',
            icon: 'pi pi-home',
            items: [
              {
                  label: 'Components',
                  icon: 'pi pi-bolt'
              },
              {
                  label: 'Blocks',
                  icon: 'pi pi-server'
              },
              {
                  label: 'UI Kit',
                  icon: 'pi pi-pencil'
              },
              {
                  label: 'Templates',
                  icon: 'pi pi-palette',
                  items: [
                      {
                          label: 'Apollo',
                          icon: 'pi pi-palette'
                      },
                      {
                          label: 'Ultima',
                          icon: 'pi pi-palette'
                      }
                  ]
              }
          ]
        },
        {
            label: 'Ahorros e inversiones',
            icon: 'pi pi-chart-line',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ]
}
}
