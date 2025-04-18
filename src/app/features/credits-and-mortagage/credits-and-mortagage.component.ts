import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MenuLeftComponent } from '../../shared/components/menu-left/menu-left.component';
import { MenuTopComponent } from '../../shared/components/menu-top/menu-top.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-credits-and-mortagage',
  imports: [RouterOutlet ,MenuLeftComponent, MenuTopComponent, CommonModule, ],

  templateUrl: './credits-and-mortagage.component.html',
  styleUrl: './credits-and-mortagage.component.scss'
})
export class CreditsAndMortagageComponent {
  title: string = '';
  items: MenuItem[] | undefined;
  isMenuVisible: boolean = false;
  page:number=0;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Mis créditos',
        icon: 'pi pi-file',
        route: 'all',
      },

    ];
    this.route.data.subscribe((data) => {
      this.title = data['title'];
    });
  }

}
