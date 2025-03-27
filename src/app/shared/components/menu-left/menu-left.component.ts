import { Component, Input, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
  selector: 'app-menu-left',
  imports: [TieredMenu],
  templateUrl: './menu-left.component.html',
  styleUrl: './menu-left.component.scss'
})
export class MenuLeftComponent {
@Input() items: MenuItem[] | undefined;
}
