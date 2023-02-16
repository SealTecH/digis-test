import { TestBed } from '@angular/core/testing';
import { take, of } from 'rxjs';
import { DbService } from '../../services/db.service';
import { mockStocks } from '../../common/mocks';
import { Balance } from '../../common/interfaces';
import { BalanceService } from './balance.service';
import createSpy = jasmine.createSpy;

describe('Balance Service', () => {
   class MockDbService {
      getStockTrades = createSpy('getStockTrades').and.returnValue(of(mockStocks));
   }

   let service: BalanceService;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         providers: [BalanceService, { provide: DbService, useClass: MockDbService }]
      });
      service = TestBed.inject(BalanceService);
   });

   it('should correctly calculate chart data', () => {
      const expected: Balance[] = [{
         time: 1677189600000,
         value: 2222
      },
      {
         time: 1677448800000,
         value: 2777
      }];

      service.init();
      service.data$.pipe(take(1)).subscribe((res) => {
         expect(res).toEqual(expected);
      });
   });
});
