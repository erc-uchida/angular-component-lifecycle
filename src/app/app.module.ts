import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { DropDownComponent } from './shared/components/dropdown/dropdown.component';
import { InputRadioComponent } from './shared/components/input-radio/input-radio.component';
import { InputTextComponent } from './shared/components/input-text/input-text.component';
import { DataStoreService } from './shared/services/data-store/data-store.service';
import { AuthService } from './shared/services/auth/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { LoggerService } from './shared/services/logger/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    InputTextComponent,
    DropDownComponent,
    ButtonComponent,
    InputRadioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'list', component: ListComponent},
      {path: 'form', component: FormComponent}
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    DataStoreService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
