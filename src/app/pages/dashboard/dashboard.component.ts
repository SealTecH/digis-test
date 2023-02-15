import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StockDialogComponent, StockDialogData } from '../../dialogs/stock-dialog/stock-dialog.component';
import { Stock } from '../../common/interfaces';
import { mockShares } from '../../common/mocks';
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
   readonly displayedColumns = ['share', 'enterPrice', 'exitPrice', 'enterDate', 'exitDate', 'edit'];
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

   getShare(id: number): string {
      return mockShares.find(share => share.id === id)!.name;
   }

   getDate(timestamp: number): string {
      return new Date(timestamp).toDateString();
   }

   createStockTrade(): void {
      const dialogRef = this.dialog.open<StockDialogComponent, StockDialogData, Stock>(StockDialogComponent, {
         data: { stock: null, sharesList: mockShares }, disableClose: true
      });

      dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
         if (result) {
            this.service.addStockTrade(result).pipe(take(1)).subscribe();
         }
      });
   }

   editStock(stock: Stock): void {
      const dialogRef = this.dialog.open<StockDialogComponent, StockDialogData, Stock>(StockDialogComponent, {
         data: { stock, sharesList: mockShares }, disableClose: true
      });

      dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
         if (result) {
            this.service.editStockTrade(result).pipe(take(1)).subscribe();
         }
      });
   }
}
