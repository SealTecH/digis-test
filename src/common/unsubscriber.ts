import { Subscription } from 'rxjs';
import { Directive } from '@angular/core';
@Directive()
export abstract class Unsubscriber {
  set subs(value:Subscription){
    this._subs.push(value);
  }
  private _subs: Subscription[] = [];

  ngOnDestroy(): void {
    this._subs.forEach(sub=>sub.unsubscribe());
  }
}
