import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Child3Component } from '../child3/child3.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  title = 'Child component lifecycle.';

  @ContentChild(Child3Component) childContent: Child3Component;

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
    this.title = 'Child title changed.';
    console.log('Child3Component.ChildContent', this.childContent.title);
  }

  ngOnDestroy() {
    this.log('ngOnDestroy');
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit');
    console.log('Child3Component.ChildContent', this.childContent.title);
  }

  ngAfterContentChecked() {
    this.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked');
  }

  log(msg) {
    console.log(`%c${msg}`, 'color: blue');
    console.log(this.title);
  }

}
