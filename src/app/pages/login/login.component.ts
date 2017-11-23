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
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { LoggerService } from '../../shared/services/logger/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  form: FormGroup;
  subscriptions: Subscription[] = [];

  componentName = 'LoginComponent';
  logStyle = 'color: green';

  @ViewChild('id') id: InputTextComponent;
  @ViewChild('password') password: InputTextComponent;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private logger: LoggerService) { }

  ngOnChanges() {
    this.logger.log(`${this.componentName} ngOnChanges`, this.logStyle);
  }

  ngDoCheck() {
    this.logger.log(`${this.componentName} ngDoCheck`, this.logStyle);
  }

  ngOnInit() {
    this.logger.log(`${this.componentName} ngOnInit`, this.logStyle);
    this.form = this.formBuilder.group({
      id: ['1'],
      password: ['']
    });
    if (this.auth.loggedIn) {
      this.router.navigate(['list']);
    }
  }

  ngAfterContentInit() {
    this.logger.log(`${this.componentName} ngAfterContentInit`, this.logStyle);
  }

  ngAfterContentChecked() {
    this.logger.log(`${this.componentName} ngAfterContentChecked`, this.logStyle);
  }

  ngAfterViewInit() {
    this.logger.log(`${this.componentName} ngAfterViewInit`, this.logStyle);
  }

  ngAfterViewChecked() {
    this.logger.log(`${this.componentName} ngAfterViewChecked`, this.logStyle);
  }

  ngOnDestroy() {
    this.logger.log(`${this.componentName} ngOnDestroy`, this.logStyle);
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onLogin() {
    const sub = this.auth.login({
      id: this.id.value,
      name: '',
      role: ''
    }).subscribe(res => {
      if (!res) {
        alert('ID、パスワードを確認してください');
        return;
      }
      this.router.navigate(['list']);
    });
    this.subscriptions.push(sub);
  }
}
