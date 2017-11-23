import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ChildComponent } from './child/child.component';
import { GrandChildComponent } from './child/grand-child/grand-child.component';
// import { Child2Component } from './child2/child2.component';
// import { Child3Component } from './child3/child3.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  title = 'Angular component lifecycle.';
  visibleChild2 = false;

  @ViewChild(ChildComponent) private child: ChildComponent;
  // @ViewChild(Child2Component) private child2: Child2Component;
  // @ViewChild(Child3Component) private child3: Child3Component;
  @ViewChild(GrandChildComponent) private grandChild: GrandChildComponent;

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
    console.log('ChildComponent.title', this.child.title);
    // console.log('Child2Component.title', this.child2.title);
    // console.log('Child3Component.title', this.child3.title);
    console.log('this.grandChild', this.grandChild);
    // console.log('GrandChildComponent.title', this.grandChild.title);
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
    console.log('ChildComponent.title', this.child.title);
    // console.log('Child2Component.title', this.child2.title);
    // console.log('Child3Component.title', this.child3.title);
    console.log('this.grandChild', this.grandChild);
    // console.log('GrandChildComponent.title', this.grandChild.title);
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked');
  }

  log(msg) {
    console.log(`%c${msg}`, 'color: red');
    console.log(this.title);
  }

  onButtonClick() {
    console.log('-- onButtonClick --');
    this.visibleChild2 = !this.visibleChild2;
  }
}
