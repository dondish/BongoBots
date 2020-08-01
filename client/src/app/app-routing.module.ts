import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BotComponent } from './bot/bot.component';
import { AddBotComponent } from './add_bot/add_bot.component';
import { SnowflakeGuard } from './snowflake.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'bot', children: [
    { path: 'add', component: AddBotComponent },
    { path: ':botId', component: BotComponent, canActivate: [SnowflakeGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
