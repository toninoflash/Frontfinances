import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AppConfigService } from '../../../../core/services/appconfigservice';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-doughnut',
  imports: [ChartModule],
  templateUrl: './doughnut.component.html',
  styleUrl: './doughnut.component.scss'
})
export class DoughnutComponent implements OnInit {
  private _dataSource: any = {};

  @Input()
  set dataSource(value: any) {
    this._dataSource = value;
    this.initChart(); // Ejecuta initChart cuando dataSource cambie
  }

  get dataSource(): any {
    return this._dataSource;
  }
  @Input() labels: any[] = [];
  @Input() label: any[] = [];

  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);

  configService = inject(AppConfigService);


  constructor(private cd: ChangeDetectorRef) {}

  themeEffect = effect(() => {
      if (this.configService.transitionComplete()) {
          this.initChart();
      }
  });

  ngOnInit() {
      this.initChart();
  }

  initChart() {
      if (isPlatformBrowser(this.platformId)) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--p-text-color');

          this.data = {
              labels: this.labels,
              datasets: [
                  {
                      data: [this.dataSource.totalFirst, this.dataSource.totalSecond],
                      backgroundColor: [documentStyle.getPropertyValue('--p-yellow-200'), documentStyle.getPropertyValue('--p-green-600')],
                      hoverBackgroundColor: [documentStyle.getPropertyValue('--p-yellow-300'), documentStyle.getPropertyValue('--p-green-800')]
                  }
              ]
          };

          this.options = {
              cutout: '60%',
              plugins: {
                  legend: {
                      labels: {
                          color: textColor
                      }
                  }
              }
          };
          this.cd.markForCheck()
      }
  }
}
