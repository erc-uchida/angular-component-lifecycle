import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { ListItem } from '../../components/dropdown/dropdown.component';

export interface ContactForm {
  id?: number;
  mailAddress: string;
  kind: string;
  title: string;
  description: string;
  done: boolean;
}

@Injectable()
export class DataStoreService {

  private contactHistories: ContactForm[] = [];
  private kindOptions: ListItem[] = [
    {name: 'お選び下さい', value: '0'},
    {name: '改善要望', value: '1'},
    {name: 'バグ報告', value: '2'},
    {name: 'その他', value: '3'}
  ];
  private editValue: number;

  constructor() { }

  getKindOptions(): Observable<ListItem[]> {
    return Observable.of(this.kindOptions).pipe(delay(500));
  }

  send(value: ContactForm): Observable<boolean> {
    this.updateHistory(value);
    return Observable.of(true).pipe(delay(1000));
  }

  getContactHistories(): Observable<ContactForm[]> {
    return Observable.of(this.contactHistories).pipe(delay(1000));
  }

  setEditValue(value: number): void {
    this.editValue = value;
  }

  getEditContact(): ContactForm {
    const editContact = this.searchHistory(this.editValue);
    this.editValue = 0;
    return editContact;
  }

  private updateHistory(value: ContactForm) {
    if (value.id === 0) {
      // 履歴追加
      value.id = this.contactHistories.length + 1;
      this.contactHistories.push(value);
    } else {
      // 履歴更新
      const updateIndex = this.contactHistories.findIndex(history => history.id === value.id);
      this.contactHistories[updateIndex] = value;
    }
  }

  searchHistory(searchId: number): ContactForm {
    return this.contactHistories.find(history => {
      return history.id === searchId;
    });
  }
}
