import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service'
import { User } from '../_models/user';

interface NavbarMenuOption {
  icon: string;
  name: string;
  href?: string;
  routerLink?: string;
  notShowedWhenLoggedIn?: boolean;
  notShowedWhenNotLoggedIn?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  values: NavbarMenuOption[] = [
    { icon: 'home', name: 'Home', routerLink: '/'},
    { icon: 'login', name: 'Login', href: '/login', notShowedWhenLoggedIn: true },
    { icon: 'face', name: 'Profile', routerLink: '/profile', notShowedWhenNotLoggedIn: true },
    { icon: 'logout', name: 'Logout', href: '/logout', notShowedWhenNotLoggedIn: true }
  ]
  authService: AuthService;
  user: User

  constructor(authService: AuthService) { 
    this.authService = authService;
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.user = user);
  }

  loggedIn(): boolean {
    return !!this.user;
  }

  filteredValues() {
    return this.values.filter(option=>!((this.loggedIn() && option.notShowedWhenLoggedIn) || (!this.loggedIn() && option.notShowedWhenNotLoggedIn)));
  }

}
