import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  log(msg, style) {
    console.log(`%c${msg}`, style);
  }

}
