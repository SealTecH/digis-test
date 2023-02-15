import { Injectable } from '@angular/core';
import { BehaviorSubject, take, finalize, Observable, switchMap, tap } from 'rxjs';
import { Stock } from '../common/interfaces';
import { DbService } from '../services/db.service';

@Injectable()
export class DashboardService {
  private readonly loadingSource = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSource.pipe();
  private readonly dataSource = new BehaviorSubject<Stock[]>([]);
  readonly data$ = this.dataSource.pipe();
  constructor(private dbService: DbService) {
  }

  init(): void {
    this.loadingSource.next(true)
    this.dbService.getStockTrades().pipe(take(1), finalize(() => this.loadingSource.next(false))).subscribe(res=>{
      this.dataSource.next(res);
    })
  }

  addStockTrade(stock: Stock): Observable<any> {
    this.loadingSource.next(true)
    return  this.dbService.addStockTrade(stock).pipe(
      take(1),
      switchMap(()=> this.retrieveStocks()),
      finalize(() => this.loadingSource.next(false)))
  }

  editStockTrade(stock: Stock): Observable<any> {
    this.loadingSource.next(true)
    return  this.dbService.editStockTrade(stock).pipe(
      take(1),
      switchMap(()=> this.retrieveStocks()),
      finalize(() => this.loadingSource.next(false)))
  }

  private retrieveStocks():Observable<Stock[]> {
    return this.dbService.getStockTrades().pipe(tap(res=>this.dataSource.next(res)))
  }


}
