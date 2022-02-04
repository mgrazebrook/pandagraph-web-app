import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from 
    "@angular/platform-browser/animations";

import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header.component';
import { FooterComponent } from './shared/footer.component';
import { StackedGraphComponent } from './stacked-graph/stacked-graph.component';
import { LineChartComponent } from './line-chart/line-chart.component';

import { ChartModule } from 'primeng/chart';
import { SplitterModule } from 'primeng/splitter';
import { SliderModule } from 'primeng/slider';
import {CalendarModule} from 'primeng/calendar';

const uri = 'https://48p1r2roz4.sse.codesandbox.io'; // our GraphQL API

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StackedGraphComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SplitterModule,
    SliderModule,
    FormsModule,
    CalendarModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://127.0.0.1:5000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
