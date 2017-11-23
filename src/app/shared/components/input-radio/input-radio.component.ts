import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css']
})
export class InputRadioComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  private _selectedValue = false;

  componentName = 'InputRadioComponent';
  logStyle = 'background-color: yellow';

  @Input() id: string;
  @Input() name: string;
  @Input() title: string;
  @Input() label: string;
  @Input() value: number;
  @Input() visible: boolean;
  @Output() onChecked = new EventEmitter<number>();

  get selectedValue(): boolean {
    return this._selectedValue;
  }

  set selectedValue(val: boolean) {
    this._selectedValue = val;
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

  onValueChanged(val: boolean) {
    this.selectedValue = val;
    this.onChecked.emit(this.value);
  }

}
