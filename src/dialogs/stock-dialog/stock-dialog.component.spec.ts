import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockShares } from '../../common/mocks';
import { Stock } from '../../common/interfaces';
import { StockDialogComponent, StockDialogData } from './stock-dialog.component';
import createSpy = jasmine.createSpy;

describe('StockDialogComponent', () => {
   class MockMatDialogRef {
      close = createSpy('close');
   }

   const mockDialogData: StockDialogData = { stock: null, sharesList: mockShares };

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

   it('should validate exit price control', () => {
      component.form.controls.enterPrice.setValue(1000);
      component.form.controls.exitPrice.setValue(800);
      expect(component.form.controls.exitPrice.valid).toBeTruthy();
      component.form.controls.enterPrice.setValue(600);
      expect(component.form.controls.exitPrice.invalid).toBeTruthy();
      component.form.controls.exitPrice.setValue(400);
      expect(component.form.controls.exitPrice.valid).toBeTruthy();
   });

   it('should correctly save data', () => {
      const enterDate = new Date();
      const exitDate = new Date(enterDate.getTime() + 3600 * 1000 * 24);

      component.form.controls.enterPrice.setValue(1000);
      component.form.controls.exitPrice.setValue(800);
      component.form.controls.enterDate.setValue(enterDate);
      component.form.controls.exitDate.setValue(exitDate);
      component.form.controls.shareId.setValue(1);
      component.saveStock();

      const expected: Stock = {
         enterPrice: 1000,
         exitPrice: 800,
         id: null,
         shareId: 1,
         enterDate: enterDate.getTime(),
         exitDate: exitDate.getTime()
      };

      expect(dialogRef.close).toHaveBeenCalledOnceWith(expected);
   });
});
