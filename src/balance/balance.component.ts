import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Unsubscriber } from '../common/unsubscriber';
import { chartOptions } from './highchart.config';
import { BalanceService } from './balance.service';

@Component({
   selector: 'app-balance',
   standalone: true,
   imports: [CommonModule, MatButtonModule],
   templateUrl: './balance.component.html',
   styleUrls: ['./balance.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [BalanceService]
})
export class BalanceComponent extends Unsubscriber implements OnInit {
   chart: Highcharts.Chart | undefined;
   constructor(private router: Router, private service: BalanceService) {
      super();
   }

   ngOnInit(): void {
      this.chart = Highcharts.chart('chart', chartOptions);
      this.service.init();
      this.subs = this.service.data$.subscribe((data) => {
         const preparedData = data.map(({ time, value }) => ([time, value]));

         this.chart!.series[0].setData([...preparedData]);
      });
   }

   back(): void {
      this.router.navigate(['../']);
   }
}
