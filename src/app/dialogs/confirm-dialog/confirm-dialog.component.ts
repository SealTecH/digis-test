import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
  title: string;
  message: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
}

@Component({
   selector: 'app-confirm-dialog',
   standalone: true,
   imports: [CommonModule, MatDialogModule, MatButtonModule],
   templateUrl: './confirm-dialog.component.html',
   styleUrls: ['./confirm-dialog.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
   constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
   ) {}

   cancel(): void {
      this.dialogRef.close();
   }
}
