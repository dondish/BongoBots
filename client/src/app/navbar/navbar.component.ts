import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Bot } from '../_models/bot';
import { flatMap, filter } from 'rxjs/operators';
import { BotsService } from '../_services/bots.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

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
    { icon: 'home', name: 'Home', href: '/'},
    { icon: 'login', name: 'Login', href: '/auth/login', notShowedWhenLoggedIn: true },
    { icon: 'add', name: 'Add Bot', href: '/bot/add', notShowedWhenNotLoggedIn: true },
    { icon: 'face', name: 'Profile', href: '/profile', notShowedWhenNotLoggedIn: true },
    { icon: 'logout', name: 'Logout', href: '/auth/logout', notShowedWhenNotLoggedIn: true }
  ];
  authService: AuthService;
  botsService: BotsService;
  user: User;
  searchMode  = false;
  searchControl: FormControl = new FormControl();
  searchResults: Observable<Bot[]>;
  router: Router;

  constructor(authService: AuthService, botsService: BotsService, router: Router) {
    this.authService = authService;
    this.botsService = botsService;
    this.router = router;
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.user = user);
    this.searchResults = this.searchControl.valueChanges.pipe(
      filter(value => !!value && value.length > 0),
      flatMap(value => this.botsService.lookup(value))
    );
  }

  loggedIn(): boolean {
    return !!this.user;
  }

  filteredValues(): NavbarMenuOption[] {
    return this.values
    .filter(option => !((this.loggedIn() && option.notShowedWhenLoggedIn) || (!this.loggedIn() && option.notShowedWhenNotLoggedIn)));
  }

  toggleSearch(): void {
    this.searchMode = !this.searchMode;
  }

  openBot(event: MatAutocompleteSelectedEvent): void {
    this.searchControl.setValue('');
    this.searchMode = false;
    this.router.navigate(['/bot', event.option.value]).then((e) => {
      if (e) {
        console.log('Moved to bot screen');
      } else {
        console.log('Failed to move to bot screen');
      }
    });
  }

}
