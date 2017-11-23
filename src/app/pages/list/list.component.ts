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
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ListItem } from '../../shared/components/dropdown/dropdown.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ContactForm, DataStoreService } from '../../shared/services/data-store/data-store.service';
import { LoggerService } from '../../shared/services/logger/logger.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  rows$: Observable<ContactForm[]>;
  kindOptions$: Observable<ListItem[]>;
  kindOptions: ListItem[];
  subscriptions: Subscription[] = [];
  selectedValue = 0;

  componentName = 'ListComponent';
  logStyle = 'color: blue';

  constructor(private auth: AuthService,
              private router: Router,
              private dataStore: DataStoreService,
              private logger: LoggerService) { }

  ngOnChanges() {
    this.logger.log(`${this.componentName} ngOnChanges`, this.logStyle);
  }

  ngDoCheck() {
    this.logger.log(`${this.componentName} ngDoCheck`, this.logStyle);
  }

  ngOnInit() {
    this.logger.log(`${this.componentName} ngOnInit`, this.logStyle);
    if (!this.auth.loggedIn) {
      this.router.navigate(['login']);
      return;
    }
    this.rows$ = this.dataStore.getContactHistories();
    this.kindOptions$ = this.dataStore.getKindOptions();
    const sub = this.kindOptions$.subscribe(kindOptions => {
      this.kindOptions = kindOptions;
    });
    this.subscriptions.push(sub);
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

  findKindNameByValue(value: string): string {
    const foundOption = this.kindOptions.find(option => option.value === value);
    return foundOption.name;
  }

  onClickEdit() {
    this.dataStore.setEditValue(this.selectedValue);
    this.router.navigate(['form']);
  }

  onRadioSelected(value: number) {
    this.selectedValue = value;
  }
}
