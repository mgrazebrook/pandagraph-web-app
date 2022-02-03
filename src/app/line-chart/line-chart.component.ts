import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  title = 'line-chart';

  allDataByMonths: any = [];
  loading = true;
  error: any;

  lineData: any;
  lineOptions: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            allDataByMonths {
              id
              employees
              satisfaction
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

        this.lineData = {
          labels: this.allDataByMonths.map(
            (dataByMonth: any) => dataByMonth.month
          ),
          datasets: [
            {
              label: 'Employee to Customer Ratio',
              borderColor: '#000000',
              backgroundColor: '#000000',
              tension: .4,
              data: this.allDataByMonths.map(
                (dataByMonth: any) => dataByMonth.employees / dataByMonth.customers
              ),
            },
            {
              label: 'Customer Satisfaction',
              borderColor: '#6ec2ac',
              backgroundColor: '#6ec2ac',
              tension: .4,
              data: this.allDataByMonths.map(
                (dataByMonth: any) => dataByMonth.satisfaction
              ),
            }
          ]
        };
    });
  }
}
