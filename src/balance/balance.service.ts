import { BehaviorSubject, take, finalize } from 'rxjs';
import { Balance } from '../common/interfaces';
import { DbService } from '../services/db.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BalanceService {
  private readonly loadingSource = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSource.pipe();
  private readonly dataSource = new BehaviorSubject<Balance[]>([]);
  readonly data$ = this.dataSource.pipe();

  constructor(private dbService: DbService) {
  }

  init(): void {
    this.loadingSource.next(true)
    this.dbService.getBalance().pipe(take(1), finalize(() => this.loadingSource.next(false))).subscribe(res=>{
      this.dataSource.next(res);
    })
  }
}
