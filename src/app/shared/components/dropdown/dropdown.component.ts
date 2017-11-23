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

export interface ListItem {
  name: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropDownComponent)
    }
  ]
})
export class DropDownComponent
  implements ControlValueAccessor,
    OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  private _selectedValue: string;
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  componentName = 'DropDownComponent';
  logStyle = 'color: purple';

  @Input() id: string;
  @Input() label: string;
  @Input() options: ListItem[];

  get selectedValue(): string {
    return this._selectedValue;
  }

  set selectedValue(val: string) {
    this._selectedValue = val;
    this.onChangeCallback(val);
    this.onTouchedCallback();
  }

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

  writeValue(obj: any) {
    this._selectedValue = obj;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onValueChanged(val: any) {
    this._selectedValue = '' + val.target.selectedIndex;
    this.onChangeCallback(this._selectedValue);
  }

}
