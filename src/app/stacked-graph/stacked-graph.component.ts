import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'stacked-graph',
  templateUrl: './stacked-graph.component.html',
})
export class StackedGraphComponent {
  title = 'stacked-graph';

  allDataByMonths: any = [];
  loading = true;
  error: any;

  stackedData: any;
  stackedOptions: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            allDataByMonths {
              id
              revenue
              expenses
              customers
              month
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.allDataByMonths = result?.data?.allDataByMonths;
        this.loading = result.loading;
        this.error = result.error;

        this.stackedData = {
          labels: this.allDataByMonths.map(
            (dataByMonth: any) => dataByMonth.month
          ),
          datasets: [
            {
              type: 'line',
              label: 'No. of Customers',
              yAxisID: 'y1',
              borderColor: '#1f9925',
              backgroundColor: '#1f9925',
              borderWidth: 2,
              fill: false,
              data: this.allDataByMonths.map(
                (dataByMonth: any) => dataByMonth.customers
              ),
            },
            {
              type: 'bar',
              label: 'Expenses',
              yAxisID: 'y',
              borderColor: '#c29cf7',
              backgroundColor: '#c29cf7',
              borderWidth: 2,
              fill: true,
              data: this.allDataByMonths.map(
                (dataByMonth: any) => dataByMonth.expenses
              ),
            },
            {
              type: 'bar',
              label: 'Profit',
              yAxisID: 'y',
              borderColor: '#fcc679',
              backgroundColor: '#fcc679',
              borderWidth: 2,
              fill: true,
              data: this.allDataByMonths.map(
                (dataByMonth: any) => dataByMonth.revenue - dataByMonth.expenses
              ),
            },
          ],
        };
        this.stackedOptions = {
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
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
            stacked: true,
            grid: {
              color: '#ebedef'
            }
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
    });
  }
}
