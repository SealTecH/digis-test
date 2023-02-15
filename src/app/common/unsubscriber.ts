import { Subject } from 'rxjs';
import { Directive } from '@angular/core';

@Directive()
export abstract class Unsubscriber {
   _destroy$ = new Subject();

   ngOnDestroy(): void {
      this._destroy$.complete();
   }
}
