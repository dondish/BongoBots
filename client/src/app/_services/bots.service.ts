import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { Bot } from '../_models/bot';
import {map, find, delay} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const DONBOT: Bot = {
  id: '420517675509350400',
  name: 'DonBot',
  status: 'offline',
  avatar: 'https://cdn.discordapp.com/avatars/420517675509350400/e273990ec05d400b88575ff12f714fd6.png?size=1024',
  prefix: '^',
  short_desc: 'Awesome Bot',
  long_desc: 'Omg such an awesome bot\nI really enjoy using it!',
  ownerId: '239790360728043520',
  ownersIds: []
};

const NINO: Bot = {
  id: '531613242473054229',
  name: 'Nino',
  status: 'online',
  avatar: 'https://cdn.discordapp.com/avatars/531613242473054229/a822e90063fd0359d15fdf6ad3af64de.png?size=1024',
  prefix: 'x!',
  server_count: 300,
  short_desc: 'Advanced Moderation Bot',
  long_desc: 'Omg such an awesome bot\nI really enjoy using it!',
  ownerId: '239790360728043520',
  ownersIds: [],
  verified: true
};

@Injectable({
  providedIn: 'root'
})
export class BotsService {
  bots: Observable<Bot[]>;
  botsSubject: BehaviorSubject<Bot[]>;

  constructor(private http: HttpClient) {
    this.botsSubject = new BehaviorSubject<Bot[]>([DONBOT, NINO]);
    this.bots = this.botsSubject.asObservable();
  }

  getBots(): Observable<Bot[]> {
    return this.bots;
  }

  private matchArgs(str1: string, str2: string): boolean {
    return str1.toLowerCase().includes(str2.toLowerCase());
  }

  lookup(query: string): Observable<Bot[]> {
    return this.bots
      .pipe(
        map(value => value.filter(bot => this.matchArgs(bot.name, query) || this.matchArgs(bot.short_desc, query)))
      );
  }

  fetchBotById(id: string): Observable<Bot> {
    return this.bots.pipe(delay(500), map(bots => bots.find(bot => bot.id === id)));
  }

  addBot(bot: Bot): Observable<Bot> {
    return this.http.post('/api/bots/addbot', bot).pipe(map(b => b as Bot));
  }
}
