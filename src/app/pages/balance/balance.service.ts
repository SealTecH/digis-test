import { BehaviorSubject, take, finalize } from 'rxjs';
import { Injectable } from '@angular/core';
import { Balance } from '../../common/interfaces';
import { DbService } from '../../services/db.service';

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
      this.dbService.getBalance().pipe(take(1), finalize(() => this.loadingSource.next(false))).subscribe((res) => {
         this.dataSource.next(res);
      });
   }
}
