import {Injectable} from '@angular/core';
import AWN, {Options} from 'awesome-notifications';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly awn: AWN;
  private readonly options: Options;

  constructor() {
    this.awn = new AWN();
    this.options = {
      durations: {
        alert: 0
      }
    }
  }

  success(message: string) {
    this.awn.success(message);
  }

  error(message: string) {
    this.awn.alert(message, this.options);
  }
}
