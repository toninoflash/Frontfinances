import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AppConfigService } from '../../../../core/services/appconfigservice';
@Component({
  selector: 'app-basic',
  imports: [ChartModule],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss'
})
export class BasicComponent  implements OnInit {
  @Input() dataSource:any [] = []
  @Input() labels:any [] = []
  basicData: any;

  basicOptions: any;

  platformId = inject(PLATFORM_ID);

  configService = inject(AppConfigService);

  constructor(private cd: ChangeDetectorRef) {}

  themeEffect = effect(() => {
      if (this.configService.transitionComplete()) {

      }
  });

  ngOnInit() {
      this.initChart();
  }

  initChart() {
      if (isPlatformBrowser(this.platformId)) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--p-text-color');
          const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
          const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

          this.basicData = {
              labels: this.labels,
              datasets: [
                  {
                      label: 'Sales',
                      data: [540, 325, 702],
                      backgroundColor: [
                          'rgba(249, 115, 22, 0.2)',
                          'rgba(6, 182, 212, 0.2)',
                          'rgb(107, 114, 128, 0.2)',
                      ],
                      borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', ],
                      borderWidth: 1,
                  },
              ],
          };

          this.basicOptions = {
              plugins: {
                  legend: {
                      labels: {
                          color: textColor,
                      },
                  },
              },
              scales: {
                  x: {
                      ticks: {
                          color: textColorSecondary,
                      },
                      grid: {
                          color: surfaceBorder,
                      },
                  },
                  y: {
                      beginAtZero: true,
                      ticks: {
                          color: textColorSecondary,
                      },
                      grid: {
                          color: surfaceBorder,
                      },
                  },
              },
          };
          this.cd.markForCheck()
      }
  }
}
