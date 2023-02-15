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
import { Stock, FormEntity, Share } from '../../common/interfaces';
import { Unsubscriber } from '../../common/unsubscriber';
import { lessThanValueValidator } from './validators';

export interface StockDialogData {
  stock: Stock | null,
  sharesList: Share[];
}

interface StockForm {
  enterDate: Date | null;
  exitDate: Date | null;
  enterPrice: number | null;
  exitPrice: number | null;
  id: string | null;
  shareId: number | null;
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
   minDate = new Date();
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
            Validators.max(1000000),
            (control: FormControl) => lessThanValueValidator(control,
               this.form?.controls.enterPrice.value,
               'Exit price cannot be greater than enter price')
         ]
      ),
      id: new FormControl<string | null>(null),
      shareId: new FormControl<number | null>(
         null,
         { nonNullable: true, validators: [Validators.required] }
      )
   });

   constructor(
    private dialogRef: MatDialogRef<StockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StockDialogData
   ) {
      super();
   }

   ngOnInit(): void {
      if (this.data.stock) {
         this.form.setValue(this.normalizeStock(this.data.stock));
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
         shareId: value.shareId!,
         enterDate: value.enterDate!.getTime(),
         exitDate: value.exitDate!.getTime()
      };
   }

   private listenToControlChanges(): void {
      this.subs = this.form.controls.enterPrice.valueChanges.subscribe(() => {
         this.form.controls.exitPrice.updateValueAndValidity();

         if (this.form.controls.exitPrice.pristine && !!this.form.controls.exitPrice.errors) {
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
