import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 

import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { BotsService } from './_services/bots.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BotGridComponent } from './bot-grid/bot-grid.component';
import { BotComponent } from './bot/bot.component';
import { HttpClientModule } from '@angular/common/http';
import { AddBotComponent } from './add_bot/add_bot.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfilePageComponent,
    HomeComponent,
    BotGridComponent,
    BotComponent,
    AddBotComponent
  ],
  imports: [
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSelectModule
  ],
  providers: [
    AuthService,
    BotsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
