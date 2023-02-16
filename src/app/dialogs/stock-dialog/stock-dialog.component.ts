import {
   ChangeDetectionStrategy, Component, Inject, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
   FormGroup, ReactiveFormsModule, FormControl, AbstractControl, Validators
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { takeUntil } from 'rxjs';
import { Stock, FormEntity } from '../../common/interfaces';
import { Unsubscriber } from '../../common/unsubscriber';

interface StockForm {
  enterDate: Date | null;
  exitDate: Date | null;
  enterPrice: number | null;
  exitPrice: number | null;
  id: string | null;
  shares: number | null;
}

@Component({
   selector: 'app-stock-dialog',
   standalone: true,
   imports: [
      CommonModule,
      MatDialogModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatInputModule,
      MatIconModule,
      MatSelectModule
   ],
   templateUrl: './stock-dialog.component.html',
   styleUrls: ['./stock-dialog.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockDialogComponent extends Unsubscriber implements OnInit {
   form: FormGroup<FormEntity<StockForm>> = new FormGroup<FormEntity<StockForm>>({
      enterDate: new FormControl<Date | null>(
         null,
         [Validators.required]
      ),
      exitDate: new FormControl<Date | null>(
         null,
         [Validators.required]
      ),
      enterPrice: new FormControl<number | null>(
         null,
         [
            Validators.required,
            Validators.min(0),
            Validators.max(1000000)
         ]
      ),
      exitPrice: new FormControl<number | null>(
         null,
         [
            Validators.required,
            Validators.min(0),
            Validators.max(1000000)
         ]
      ),
      id: new FormControl<string | null>(null),
      shares: new FormControl<number | null>(
         null,
         [Validators.required, Validators.min(1), Validators.max(1000)]
      )
   });

   constructor(
    private dialogRef: MatDialogRef<StockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stock | null
   ) {
      super();
   }

   ngOnInit(): void {
      if (this.data) {
         this.form.setValue(this.normalizeStock(this.data));
         this.form.markAsPristine();
      }

      this.listenToControlChanges();
   }

   clearInput(control: AbstractControl): void {
      control.setValue(null);
   }

   getErrors(control: AbstractControl): string {
      return control.errors ? Object.values(control)[0] : '';
   }

   saveStock(): void {
      if (this.form.valid) {
         this.dialogRef.close(this.denormalizeStock());
      }
   }

   private denormalizeStock(): Stock {
      const { value } = this.form;

      return {
         enterPrice: value.enterPrice!,
         exitPrice: value.exitPrice!,
         id: value.id!,
         shares: value.shares!,
         enterDate: value.enterDate!.getTime(),
         exitDate: value.exitDate!.getTime()
      };
   }

   private listenToControlChanges(): void {
      this.form.controls.enterPrice.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
         this.form.controls.exitPrice.updateValueAndValidity();

         if (this.form.controls.exitPrice.pristine
           && !!this.form.controls.exitPrice.errors
           && this.form.controls.exitPrice.value !== null) {
            this.form.controls.exitPrice.markAsTouched();
         }
      });
   }

   private normalizeStock(stock: Stock): StockForm {
      return {
         ...stock,
         enterDate: new Date(stock.enterDate),
         exitDate: new Date(stock.exitDate)
      };
   }
}
