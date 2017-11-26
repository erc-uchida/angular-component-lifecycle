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

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
