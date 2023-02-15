import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stock, Balance } from '../common/interfaces';

const LOCAL_STORAGE_KEY = 'stocksList';

@Injectable({
   providedIn: 'root'
})
export class DbService {
   getStockTrades(): Observable<Stock[]> {
      return of(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') as Stock[]);
   }

   addStockTrade(stock: Stock): Observable<any> {
      const stocks: Stock[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

      stocks.push({
         ...stock,
         id: new Date().getTime().toString()
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stocks));

      return of(null);
   }

   editStockTrade(stock: Stock): Observable<any> {
      const stocks: Stock[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const index = stocks.findIndex(el => el.id === stock.id);

      stocks[index] = stock;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stocks));

      return of(null);
   }

   getBalance(): Observable<Balance[]> {
      const data: Balance[] = [...Array(10)].map((_value, index) => ({
         time: new Date().getTime() + (index + 1) * 3600 * 1000,
         value: Math.round(Math.random() * 10000 + index * 500)
      }));

      return of(data);
   }
}
