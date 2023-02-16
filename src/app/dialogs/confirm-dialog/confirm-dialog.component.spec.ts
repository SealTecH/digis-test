import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StockDialogComponent } from '../stock-dialog/stock-dialog.component';
import { MockMatDialogRef } from '../../common/test-utils';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
   let component: ConfirmDialogComponent;
   let fixture: ComponentFixture<ConfirmDialogComponent>;
   const mockDialogData: ConfirmDialogData = {
      title: 'test title',
      message: 'test message'
   };

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [ConfirmDialogComponent],
         providers: [
            { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
            { provide: MatDialogRef, useClass: MockMatDialogRef }]
      }).overrideComponent(StockDialogComponent, {
         set: {
            providers: [
               { provide: MatDialogRef, useClass: MockMatDialogRef }
            ]
         }
      });

      fixture = TestBed.createComponent(ConfirmDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
