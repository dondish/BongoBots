import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

const USER: User = {
  id: '239790360728043520',
  username: 'dondish',
  discriminator: '8072',
  icon: 'https://cdn.discordapp.com/avatars/239790360728043520/109999a03001f63e4fc84725d118fe25.png?size=1024'
}

// const USER: User = undefined;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject: BehaviorSubject<User>;
  user: Observable<User>;
  constructor() { 
    this.userSubject = new BehaviorSubject<User>(undefined);
    this.user = this.userSubject.asObservable();
  }

  getUser(): Observable<User> {
    return this.user;
  }

  logIn(): Observable<void> {
    this.userSubject.next(USER);
    return of();
  }

  logOut(): Observable<void> {
    this.userSubject.next(undefined);
    return of();
  }
}
