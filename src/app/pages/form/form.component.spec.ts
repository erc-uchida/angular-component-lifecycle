import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { DropDownComponent } from '../../shared/components/dropdown/dropdown.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { DataStoreService } from '../../shared/services/data-store/data-store.service';
import { LoggerService } from '../../shared/services/logger/logger.service';

import { FormComponent } from './form.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let mailAddress: DebugElement;
  let kind: DebugElement;
  let title: DebugElement;
  let description: DebugElement;
  let send: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        InputTextComponent,
        DropDownComponent,
        ButtonComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        DataStoreService,
        LoggerService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // 依存サービスの状態を画面表示時の前提状態に変更する
    const authService = TestBed.get(AuthService);
    authService.loggedIn = true;
    authService.loggedInUser = {
      id: '1',
      name: 'Admin',
      role: 'Admin'
    };

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mailAddress = fixture.debugElement.query(By.css('#mailAddress'));
    kind = fixture.debugElement.query(By.css('#kind'));
    title = fixture.debugElement.query(By.css('#title'));
    description = fixture.debugElement.query(By.css('#description'));
    send = fixture.debugElement.query(By.css('#send'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('新規登録初期表示時の各コンポーネントの状態が正しいこと', (done: DoneFn) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(mailAddress.context.value).toBe('');
      expect(kind.context.selectedValue).toBe('0');
      expect(title.context.value).toBe('');
      expect(description.context.value).toBe('');
      done();
    });
  });

  it('データソースのバインド項目が正しいこと', (done: DoneFn) => {
    const expectedDataSource = [
      {name: 'お選び下さい', value: '0'},
      {name: '改善要望', value: '1'},
      {name: 'バグ報告', value: '2'},
      {name: 'その他', value: '3'}
    ];

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(JSON.stringify(kind.context.options)).toBe(JSON.stringify(expectedDataSource));
      done();
    });
  });

  it('各項目を入力し、送信ボタン押下で入力データが保存されること', (done: DoneFn) => {
    // 各項目を入力
    mailAddress.context.value = 'mailAddress';
    kind.context.selectedValue = '1';
    title.context.value = 'title';
    description.context.value = 'description';

    // 送信ボタン押下
    send.triggerEventHandler('click', {});

    fixture.whenStable().then(() => {
      // 非同期での反映を待って、HTMLを更新
      fixture.detectChanges();

      const expectedRegisterdContactHistory = {
        id: 1,
        mailAddress: 'mailAddress',
        kind: '1',
        title: 'title',
        description: 'description',
        done: false
      };
      const dataStoreService = TestBed.get(DataStoreService);
      expect(JSON.stringify(dataStoreService.searchHistory(1))).toBe(JSON.stringify(expectedRegisterdContactHistory));
      done();
    });
  });

});
