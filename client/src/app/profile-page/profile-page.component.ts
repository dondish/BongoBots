import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  authService: AuthService;
  user: User;

  constructor(authService: AuthService) { 
    this.authService = authService;
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.user = user);
  }

  logIn(): void {
    this.authService.logIn().subscribe();
  }

  logOut(): void {
    this.authService.logOut().subscribe();
  }

}
