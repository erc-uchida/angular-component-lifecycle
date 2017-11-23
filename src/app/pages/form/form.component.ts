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
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { DropDownComponent, ListItem } from '../../shared/components/dropdown/dropdown.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ContactForm, DataStoreService } from '../../shared/services/data-store/data-store.service';
import { LoggerService } from '../../shared/services/logger/logger.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  form: FormGroup;
  options$: Observable<ListItem[]>;
  editContactForm: ContactForm;
  subscriptions: Subscription[] = [];

  componentName = 'FormComponent';
  logStyle = 'color: red';

  @ViewChild('mailAddress') mailAddress: InputTextComponent;
  @ViewChild('kind') kind: DropDownComponent;
  @ViewChild('title') title: InputTextComponent;
  @ViewChild('description') description: InputTextComponent;
  @ViewChild('btnDone') btnDone: ButtonComponent;

  constructor(private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private dataStore: DataStoreService,
              private logger: LoggerService) {}

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
    }
    // データを取ってくる
    this.options$ = this.dataStore.getKindOptions();
    this.editContactForm = this.dataStore.getEditContact();
    this.btnDone.visible = false;
    // formの初期化
    this.form = this.formBuilder.group({
      mailAddress: [''],
      kind: ['0'],
      title: [''],
      description: ['']
    });
    this.outputFormValue();
    // 何かしらの条件で初期値を変更
    if (this.editContactForm) {
      this.form.setValue({
        mailAddress: this.editContactForm.mailAddress,
        kind: this.editContactForm.kind,
        title: this.editContactForm.title,
        description: this.editContactForm.description
      });
      this.outputFormValue();

      // formの値に関係ないプロパティは変更可能
      this.mailAddress.isDisabled = true;
      setTimeout(() => {
        this.outputFormValue();
        if (this.kind.selectedValue === '0') {
          // formの初期値を設定したあと、同じタイミングでvalueを変更することはできないためsetTimeoutで次の変更回へ持ち越し
          this.mailAddress.value = '';
          this.title.value = '';
          this.description.value = '';
        }
      });
      this.btnDone.visible = true;
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
    this.outputFormValue();
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

  onButtonClick() {
    const send$ = this.sendContactForm(false);
    const sub = send$.subscribe(res => {
      if (res) {
        alert('送信に成功しました。');

        // formをクリアします
        this.form.setValue({
          mailAddress: '',
          kind: '0',
          title: '',
          description: ''
        });
      }
    });
    this.subscriptions.push(sub);
  }

  onDoneBtnClick() {
    if (!confirm('このお問い合わせの対応を完了にしますか？')) { return; }
    const send$ = this.sendContactForm(true);
    const sub = send$.subscribe(res => {
      if (res) {
        alert('完了にしました。');
        this.router.navigate(['list']);
      }
    });
    this.subscriptions.push(sub);
  }

  private sendContactForm(done: boolean): Observable<boolean> {
    // 入力値を保存します
    const inputValue: ContactForm = {
      id: (this.editContactForm) ? this.editContactForm.id : 0,
      mailAddress: this.mailAddress.value,
      kind: this.kind.selectedValue,
      title: this.title.value,
      description: this.description.value,
      done: done
    };
    return this.dataStore.send(inputValue);
  }

  private outputFormValue() {
    const style = 'background-color: lightgreen';
    this.logger.log(JSON.stringify(this.form.value), style);
    this.logger.log(`this.mailAddress.value ${this.mailAddress.value}`, style);
    this.logger.log(`this.kind.selectedValue ${this.kind.selectedValue}`, style);
    this.logger.log(`this.title.value ${this.title.value}`, style);
    this.logger.log(`this.description.value ${this.description.value}`, style);
  }
}
