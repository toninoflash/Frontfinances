import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AppConfigService } from '../../../../core/services/appconfigservice';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-doughnut-dynamic',
    imports: [ChartModule],
  templateUrl: './doughnut-dynamic.component.html',
  styleUrl: './doughnut-dynamic.component.scss'
})
export class DoughnutDynamicComponent implements OnInit {
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
    this.dataSource = [
      { value: 120, color: '--p-yellow-200', hoverColor: '--p-yellow-300' },
      { value: 80, color: '--p-green-600', hoverColor: '--p-green-800' },
      { value: 50, color: '--p-blue-500', hoverColor: '--p-blue-700' },
    ];
      this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      const values = this.dataSource.map((item:any) => item.value);
      const backgroundColors = this.dataSource.map((item:any) =>
        documentStyle.getPropertyValue(item.color)
      );
      const hoverBackgroundColors = this.dataSource.map((item:any) =>
        documentStyle.getPropertyValue(item.hoverColor)
      );

      this.data = {
        labels: this.labels, // asegúrate que labels tenga el mismo número de elementos
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: hoverBackgroundColors
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

      this.cd.markForCheck();
    }
  }

}
