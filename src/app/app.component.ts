import { Component } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pandagraph-web-app';

  allYearOnYearRevenues: any = [];
  loading = true;
  error: any;

  basicData: any;
  basicOptions: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        {
            allYearOnYearRevenues {
              id,
              month,
              revenue,
              expenses
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.allYearOnYearRevenues = result?.data?.allYearOnYearRevenues;
        this.loading = result.loading;
        this.error = result.error;

        this.basicData = {
          labels: this.allYearOnYearRevenues.map((revenue: any) => revenue.month),
          datasets: [
              {
                  label: 'Revenue',
                  backgroundColor: '#42A5F5',
                  data: this.allYearOnYearRevenues.map((revenue: any) => revenue.revenue),
              },
              {
                  label: 'Expenses',
                  backgroundColor: '#FFA726',
                  data: this.allYearOnYearRevenues.map((revenue: any) => revenue.expenses),
              }
          ]
        };

        console.log(this.basicData)
      });
  }
}
