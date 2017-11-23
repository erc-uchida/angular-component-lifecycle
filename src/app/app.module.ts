import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { Child2Component } from './child2/child2.component';
import { Child3Component } from './child3/child3.component';
import { GrandChildComponent } from './child/grand-child/grand-child.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    Child2Component,
    Child3Component,
    GrandChildComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
