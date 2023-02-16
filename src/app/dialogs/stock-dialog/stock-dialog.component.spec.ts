import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Stock } from '../../common/interfaces';
import { MockMatDialogRef } from '../../common/test-utils';
import { StockDialogComponent } from './stock-dialog.component';

describe('StockDialogComponent', () => {
   const mockDialogData: Stock | null = null;

   let component: StockDialogComponent;
   let fixture: ComponentFixture<StockDialogComponent>;
   let dialogRef: MockMatDialogRef;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            StockDialogComponent,
            MatNativeDateModule,
            NoopAnimationsModule
         ],
         providers: [
            { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
            { provide: MatDialogRef, useClass: MockMatDialogRef }
         ]
      }).overrideComponent(StockDialogComponent, {
         set: {
            providers: [
               { provide: MatDialogRef, useClass: MockMatDialogRef }
            ]
         }
      });

      fixture = TestBed.createComponent(StockDialogComponent);
      dialogRef = fixture.debugElement.injector.get(MatDialogRef) as any;
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should validate date control', () => {
      expect(component.form.controls.enterDate.invalid).toBeTruthy();
      component.form.controls.enterDate.setValue(new Date());
      component.form.controls.exitDate.setValue(new Date(new Date().getTime() + 3600 * 1000 * 24));
      expect(component.form.controls.enterDate.valid).toBeTruthy();
   });

   it('should correctly save data', () => {
      const enterDate = new Date();
      const exitDate = new Date(enterDate.getTime() + 3600 * 1000 * 24);

      component.form.controls.enterPrice.setValue(1000);
      component.form.controls.exitPrice.setValue(800);
      component.form.controls.enterDate.setValue(enterDate);
      component.form.controls.exitDate.setValue(exitDate);
      component.form.controls.shares.setValue(1);
      component.saveStock();

      const expected: Stock = {
         enterPrice: 1000,
         exitPrice: 800,
         id: null,
         shares: 1,
         enterDate: enterDate.getTime(),
         exitDate: exitDate.getTime()
      };

      expect(dialogRef.close).toHaveBeenCalledOnceWith(expected);
   });
});
