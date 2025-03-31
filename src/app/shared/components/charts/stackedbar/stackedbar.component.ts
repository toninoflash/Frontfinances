import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AppConfigService } from '../../../../core/services/appconfigservice';
@Component({
  selector: 'app-stackedbar',
  imports: [ChartModule],
  templateUrl: './stackedbar.component.html',
  styleUrl: './stackedbar.component.scss',
})
export class StackedbarComponent implements OnInit {
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
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.data = {
        labels: this.labels,
        datasets: [
          {
            type: 'bar',
            label: this.label[0],
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            data: [this.dataSource.fixedMovements, this.dataSource.fixedBills, 12, 48, 90, 76, 42],
          },
          {
            type: 'bar',
            label: this.label[1],
            backgroundColor: documentStyle.getPropertyValue('--p-gray-300'),
            data: [this.dataSource.extraMovements, this.dataSource.extraBills, 24, 75, 37, 65, 34],
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            stacked: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
