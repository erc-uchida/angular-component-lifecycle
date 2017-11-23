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
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {

  @Input() id: string;
  @Input() name: string;
  @Input() visible = true;
  @Input() isDisabled: boolean;
  @Output() onButtonClick = new EventEmitter();
  disabled: boolean;

  componentName = 'ButtonComponent';
  logStyle = 'color: orange';

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

  onClick() {
    this.disabled = true;
    this.onButtonClick.emit();
    setTimeout(() => { this.disabled = false; }, 1000);
  }
}
