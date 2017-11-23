import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { delay, map } from 'rxjs/operators';

export type Role = 'Admin' | 'General' | '';

export interface User {
  id: string;
  name: string;
  role: Role;
}

@Injectable()
export class AuthService {

  loggedIn: boolean;
  loggedInUser: User;

  constructor() { }

  login(user: User): Observable<boolean> {
    const userFound$ = this.findUserById(user.id);
    return userFound$.pipe(
      map(found => {
        if (found) {
          user.name = 'Admin';
          user.role = 'Admin';
          this.loggedIn = true;
          this.loggedInUser = user;
        }
        return found;
      })
    );
  }

  findUserById(id: string): Observable<boolean> {
    // 本当はAPIなどに問い合わせるのでObservableで返却
    if (id !== '1') {
      return Observable.of(false).pipe(delay(500));
    }
    return Observable.of(true).pipe(delay(500));
  }

}
