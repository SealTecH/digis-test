import { Injectable } from '@angular/core';
import {
   BehaviorSubject, take, finalize, Observable, switchMap, tap
} from 'rxjs';
import { Sort } from '@angular/material/sort';
import { sortBy } from 'lodash-es';
import { Stock } from '../../common/interfaces';
import { DbService } from '../../services/db.service';

@Injectable()
export class DashboardService {
   private readonly loadingSource = new BehaviorSubject<boolean>(false);
   readonly loading$ = this.loadingSource.asObservable();
   private readonly dataSource = new BehaviorSubject<Stock[]>([]);
   readonly data$ = this.dataSource.asObservable();
   constructor(private dbService: DbService) {
   }

   init(): void {
      this.loadingSource.next(true);
      this.dbService.getStockTrades().pipe(take(1), finalize(() => this.loadingSource.next(false))).subscribe((res) => {
         this.dataSource.next(res);
      });
   }

   addStockTrade(stock: Stock): Observable<Stock[]> {
      this.loadingSource.next(true);

      return this.dbService.addStockTrade(stock).pipe(
         take(1),
         switchMap(() => this.retrieveStocks()),
         finalize(() => this.loadingSource.next(false))
      );
   }

   sortData(sort: Sort): void {
      this.loadingSource.next(true);

      let sortedList = sortBy(this.dataSource.value, ['exitDate']);

      if (sort.direction === 'desc') {
         sortedList = sortedList.reverse();
      }

      this.dataSource.next(sortedList);
      this.loadingSource.next(false);
   }

   editStockTrade(stock: Stock): Observable<Stock[]> {
      this.loadingSource.next(true);

      return this.dbService.editStockTrade(stock).pipe(
         take(1),
         switchMap(() => this.retrieveStocks()),
         finalize(() => this.loadingSource.next(false))
      );
   }

   deleteStockTrade(id: string): Observable<Stock[]> {
      this.loadingSource.next(true);

      return this.dbService.deleteStockTrade(id).pipe(
         take(1),
         switchMap(() => this.retrieveStocks()),
         finalize(() => this.loadingSource.next(false))
      );
   }

   private retrieveStocks(): Observable<Stock[]> {
      return this.dbService.getStockTrades().pipe(tap(res => this.dataSource.next(res)));
   }
}
