import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, take, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockStocks } from '../../common/mocks';
import { StockDialogComponent } from '../../dialogs/stock-dialog/stock-dialog.component';
import { DashboardService } from './dashboard.service';
import { DashboardComponent } from './dashboard.component';
import createSpy = jasmine.createSpy;

describe('DashboardComponent', () => {
   class MockDashboardService {
      loading$ = new BehaviorSubject<boolean>(false);
      data$ = of(mockStocks);
      init = createSpy('init');
      addStockTrade = createSpy('addStockTrade').and.returnValue(of(true));
      editStockTrade = createSpy('editStockTrade').and.returnValue(of(true));
   }

   class MockDialogService {
      open = createSpy('open').and.returnValue(jasmine.createSpyObj({ afterClosed: of(mockStocks[0]), close: null }));
   }

   let component: DashboardComponent;
   let fixture: ComponentFixture<DashboardComponent>;
   let router: Router;
   let service: MockDashboardService;
   let dialog: MockDialogService;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            DashboardComponent,
            MockComponent(StockDialogComponent),
            RouterTestingModule,
            NoopAnimationsModule
         ],
         providers: [
            { provide: MatDialog, useClass: MockDialogService },
            { provide: DashboardService, useClass: MockDashboardService }
         ]
      }).overrideComponent(DashboardComponent, {
         set: {
            providers: [
               { provide: MatDialog, useClass: MockDialogService },
               { provide: DashboardService, useClass: MockDashboardService }
            ]
         }
      });

      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router) as any;
      spyOn(router, 'navigate');
      service = fixture.debugElement.injector.get(DashboardService) as any;
      dialog = fixture.debugElement.injector.get(MatDialog) as any;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should show stocks list', () => {
      component.data$.pipe(take(1)).subscribe((list) => {
         expect(list).toEqual(mockStocks);
      });
   });

   it('should init service', () => {
      expect(service.init).toHaveBeenCalled();
   });

   it('should open dialog for new stock', () => {
      component.createStockTrade();

      expect(dialog.open).toHaveBeenCalledOnceWith(StockDialogComponent, {
         data: null, disableClose: true
      });
   });

   it('should call create new stock method', () => {
      component.createStockTrade();
      expect(service.addStockTrade).toHaveBeenCalledOnceWith(mockStocks[0]);
   });

   it('should open dialog for edit stock', () => {
      component.editStock(mockStocks[0]);
      expect(dialog.open).toHaveBeenCalledOnceWith(StockDialogComponent, {
         data: mockStocks[0], disableClose: true
      });
   });

   it('should call edit stock method', () => {
      component.editStock(mockStocks[0]);
      expect(service.editStockTrade).toHaveBeenCalledOnceWith(mockStocks[0]);
   });

   it('should correctly navigate to balance', () => {
      component.navigateToBalance();
      expect(router.navigate).toHaveBeenCalledOnceWith(['balance']);
   });

   it('should correctly navigate to balance', () => {
      component.navigateToBalance();
      expect(router.navigate).toHaveBeenCalledOnceWith(['balance']);
   });
});
