import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pandagraph-web-app';

  allDataByMonths: any = [];
  loading = true;
  error: any;

  data: any;
  chartOptions: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            allDataByMonths {
              id
              satisfaction
              month
              employees
              customers
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.allDataByMonths = result?.data?.allDataByMonths;
        this.loading = result.loading;
        this.error = result.error;

        this.data = {
          labels: this.allDataByMonths.map(
            (dataByMonth: any) => dataByMonth.month
          ),
          datasets: [
            {
              type: 'bar',
              label: 'Customer Satisfcation',
              yAxisID: 'y1',
              borderColor: '#42A5F5',
              borderWidth: 2,
              fill: false,
              data: this.allDataByMonths.map(
                (dataByMonth: any) => dataByMonth.satisfaction
              ),
            },
            {
              type: 'line',
              label: 'No.of Employees',
              yAxisID: 'y',
              borderColor: '#FFA726',
              borderWidth: 2,
              fill: false,
              data: this.allDataByMonths.map(
                (dataByMonth: any) => dataByMonth.employees
              ),
            },
            {
              type: 'line',
              label: 'No.of Customers',
              yAxisID: 'y',
              borderColor: '#FFA726',
              borderWidth: 2,
              fill: false,
              data: this.allDataByMonths.map(
                (dataByMonth: any) => dataByMonth.customers
              ),
            },
          ],
        };
        this.chartOptions = {
          scales: {
            x: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                min: 0,
                max: 300,
                color: '#495057',
              },
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              ticks: {
                min: 0,
                max: 5,
                color: '#495057',
              },
            },
          },
        };

        console.log(this.data);
      });
  }
}
