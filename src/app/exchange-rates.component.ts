import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'exchange-rates',
  templateUrl: './exchange-rates.component.html'
})
export class ExchangeRates implements OnInit {
  allYearOnYearRevenues: any;
  loading = true;
  error: any;

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
      });
  }
}