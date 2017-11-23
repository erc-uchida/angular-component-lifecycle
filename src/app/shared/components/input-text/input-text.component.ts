import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LoggerService } from '../../services/logger/logger.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputTextComponent)
    }
  ]
})
export class InputTextComponent
  implements ControlValueAccessor,
    OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  private _value = '';
  private _isDisabled = false;
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  componentName = 'InputTextComponent';
  logStyle = 'background-color: skyblue';

  @Input() id: string;
  @Input() label: string;
  @Input() type: string;

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    console.log('InputTextComponent#setValue', val);
    this._value = val;
    this.onChangeCallback(val);
    this.onTouchedCallback();
  }

  get isDisabled(): boolean { return this._isDisabled; }
  set isDisabled(val: boolean) { this._isDisabled = val; }

  constructor(private logger: LoggerService) { }

  ngOnChanges() {
    this.logger.log(`${this.componentName} ${this.id} ngOnChanges`, this.logStyle);
  }

  ngDoCheck() {
    this.logger.log(`${this.componentName} ${this.id} ngDoCheck`, this.logStyle);
  }

  ngOnInit() {
    this.logger.log(`${this.componentName} ${this.id} ngOnInit`, this.logStyle);
  }

  ngAfterContentInit() {
    this.logger.log(`${this.componentName} ${this.id} ngAfterContentInit`, this.logStyle);
  }

  ngAfterContentChecked() {
    this.logger.log(`${this.componentName} ${this.id} ngAfterContentChecked`, this.logStyle);
  }

  ngAfterViewInit() {
    this.logger.log(`${this.componentName} ${this.id} ngAfterViewInit`, this.logStyle);
  }

  ngAfterViewChecked() {
    this.logger.log(`${this.componentName} ${this.id} ngAfterViewChecked`, this.logStyle);
  }

  ngOnDestroy() {
    this.logger.log(`${this.componentName} ${this.id} ngOnDestroy`, this.logStyle);
  }

  writeValue(obj: any): void {
    console.log('InputTextComponent#writeValue', obj);
    this._value = obj;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  onValueChanged(val: string) {
    this._value = val;
    this.onChangeCallback(val);
  }
}
