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

  rangeValues!: number[];
  lineData: any;
  lineOptions: any;
  value!: Date;

  date1 = "";
  date2 = "";

  selectedDate1 = "";
  selectedDate2 = "";

  dates!: any[]

  minDateValue: Date = new Date(2019,1,1)
  maxDateValue: Date = new Date(2021,1,1)
  defaultDateValue: Date = new Date(2019,1,1)

  constructor(private apollo: Apollo) {}

  handleChange(e: any) {
    // console.log(e.values)
    this.date1 = e.values[0];
    this.date2 = e.values[1];
  }

  handleDateSelect(e: any) {
    console.log(e)
    if(this.date1 !== "" && this.date2 !== "") {
      this.date1 = e;
      this.date2 = "";
    } else if(this.date1 == "" && this.date2  == "") {
      this.date1 = e;
      this.date2 = "";
    } else {
      this.date2 = e;
    }

    console.log('date 1', this.date1)
    console.log('date 2', this.date2)

    console.log('date 1', new Date(this.date1).toISOString())
    console.log('date 2', new Date(this.date2).toISOString())

    console.log('date 1', new Date(this.date1).toISOString().split('T')[0].split("-").join(""))
    console.log('date 2', new Date(this.date2).toISOString().split('T')[0].split("-").join(""))

    this.selectedDate1 = new Date(this.date1).toISOString().split('T')[0].split("-").join("");
    this.selectedDate2 = new Date(this.date2).toISOString().split('T')[0].split("-").join("");
  }

  handleOnClickOutside() {
    console.log('On handleOnClickOutside event triggered')
    this.apollo
      .watchQuery({
        query: gql`
          {
            DataByMonth(id: "1") {
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
