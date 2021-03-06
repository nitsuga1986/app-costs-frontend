import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import { ApiService } from '../../services/api.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
    public activityChartType: ChartType;
    public activityChartData: any;
    public activityChartOptions: any;
    public activityChartResponsive: any[];
    public activityChartLegendItems: LegendItem[];
    public inventario: any;
    public costos: any;
    public ingresos: any;
    public lotes: any;
    public balance: any;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
      this.activityChartData = {labels: [],series: [[],[]]};
      this.balance = 0;

      // GET inventario
      this.apiService.get("reportes/inventario").subscribe((data: any)=>{
        this.inventario = data;
      });

      // GET costos
      this.apiService.get("reportes/costos").subscribe((data: any)=>{
        this.costos = data;
        this.lotes = data;
        this.costos.forEach((item, index) => {
          this.activityChartData.labels.push(item.id);
          this.activityChartData.series[1].push(item.costo);
          this.balance = Number(this.balance) - Number(item.costo);
        });

        // GET ingresos
        this.apiService.get("reportes/ingresos").subscribe((data: any)=>{
          this.ingresos = data;
          this.ingresos.forEach((item, index) => {
            this.activityChartData.series[0].push(item.costo);
            this.lotes[index]['ingreso'] = item.costo
            this.balance = Number(this.balance) + Number(item.costo);
          });

          // Generate Bar Chart
          this.generateBarChart(this.activityChartData);
        });
      });

    }

    // Generate Bar Chart
    generateBarChart(chartData:any) {
      // Bar Chart
      this.activityChartType = ChartType.Bar;
      this.activityChartData = chartData;
      console.log(this.activityChartData);
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
      { title: 'Ingresos', imageClass: 'fa fa-circle text-info' },
        { title: 'Costos', imageClass: 'fa fa-circle text-danger' }
      ];
    };

}
