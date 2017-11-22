import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  title = 'Angular component lifecycle.';

  constructor() {
    this.log('constructor');
  }

  ngOnChanges() {
    this.log('ngOnChanges');
  }

  ngDoCheck() {
    this.log('ngDoCheck');
  }

  ngOnInit() {
    this.log('ngOnInit');
    this.title = 'Angular component lifecycle. change 1';
  }

  ngOnDestroy() {
    this.log('ngOnDestroy');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    this.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit');
    setTimeout(() => { this.title = 'Angular component lifecycle. change 2'; });
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked');
  }

  log(msg) {
    console.log(`%c${msg}`, 'color: red');
    console.log(this.title);
  }
}
