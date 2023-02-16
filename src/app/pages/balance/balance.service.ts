import { BehaviorSubject, take, finalize } from 'rxjs';
import { Injectable } from '@angular/core';
import { sortBy } from 'lodash-es';
import { Balance, Stock } from '../../common/interfaces';
import { DbService } from '../../services/db.service';
import { calculatePnL } from '../../common/functions';

@Injectable()
export class BalanceService {
   private readonly loadingSource = new BehaviorSubject<boolean>(false);
   readonly loading$ = this.loadingSource.asObservable();
   private readonly dataSource = new BehaviorSubject<Balance[]>([]);
   readonly data$ = this.dataSource.asObservable();

   constructor(private dbService: DbService) {
   }

   init(): void {
      this.loadingSource.next(true);
      this.dbService.getStockTrades().pipe(take(1), finalize(() => this.loadingSource.next(false))).subscribe((res) => {
         this.dataSource.next(this.createBalanceDataset(res));
      });
   }

   private createBalanceDataset(stocks: Stock[]): Balance[] {
      return sortBy<Stock>(stocks, ['exitDate']).reduce((acc: Balance[], trade: Stock, index) => {
         if (!acc.length) {
            acc.push({
               time: trade.exitDate,
               value: calculatePnL(trade.enterPrice, trade.exitPrice, trade.shares)
            });
         } else {
            acc.push({
               time: trade.exitDate,
               value: acc[index - 1].value + calculatePnL(trade.enterPrice, trade.exitPrice, trade.shares)
            });
         }

         return acc;
      }, [] as Balance[]);
   }
}
