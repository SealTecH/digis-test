import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StockDialogComponent } from '../../dialogs/stock-dialog/stock-dialog.component';
import { Stock } from '../../common/interfaces';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { calculatePnL } from '../../common/functions';
import { DashboardService } from './dashboard.service';

@Component({
   selector: 'app-dashboard',
   standalone: true,
   imports: [CommonModule, MatButtonModule, MatDialogModule, MatTableModule, MatProgressSpinnerModule],
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
   readonly displayedColumns = ['shares', 'enterPrice', 'exitPrice', 'enterDate', 'exitDate', 'pnl', 'actions'];
   readonly data$ = this.service.data$;
   readonly loading$ = this.service.loading$;
   constructor(private router: Router, private dialog: MatDialog, private service: DashboardService) {
   }

   ngOnInit(): void {
      this.service.init();
   }

   navigateToBalance(): void {
      this.router.navigate(['balance']);
   }

   getDate(timestamp: number): string {
      return new Date(timestamp).toDateString();
   }

   getPnL({ exitPrice, enterPrice, shares }: Stock): number {
      return calculatePnL(enterPrice, exitPrice, shares);
   }

   createStockTrade(): void {
      const dialogRef = this.dialog.open<StockDialogComponent, Stock | null, Stock>(StockDialogComponent, {
         data: null, disableClose: true
      });

      dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
         if (result) {
            this.service.addStockTrade(result).pipe(take(1)).subscribe();
         }
      });
   }

   editStock(stock: Stock): void {
      const dialogRef = this.dialog.open<StockDialogComponent, Stock | null, Stock>(StockDialogComponent, {
         data: stock, disableClose: true
      });

      dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
         if (result) {
            this.service.editStockTrade(result).pipe(take(1)).subscribe();
         }
      });
   }

   deleteStock({ id }: Stock): void {
      const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
         data: {
            title: 'Confirm deletion',
            message: 'Are you sure you want to delete this record& You cannot undo this operation',
            primaryButtonLabel: 'Yes'
         },
         disableClose: true
      });

      dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
         if (result) {
            this.service.deleteStockTrade(id!).pipe(take(1)).subscribe();
         }
      });
   }
}
