import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from "../layout/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-features',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, BreadcrumbComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

}
