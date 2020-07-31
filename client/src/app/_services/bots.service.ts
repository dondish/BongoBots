import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Bot } from '../_models/bot';

const DONBOT: Bot = {
  id: '420517675509350400',
  name: 'DonBot',
  avatar: 'https://cdn.discordapp.com/avatars/420517675509350400/e273990ec05d400b88575ff12f714fd6.png?size=1024',
  prefix: '^',
  short_desc: 'Awesome Bot',
  long_desc: 'Omg such an awesome bot\nI really enjoy using it!',
  ownerId: '239790360728043520',
  ownersIds: []
}

const NINO: Bot = {
  id: '531613242473054229',
  name: 'Nino',
  avatar: 'https://cdn.discordapp.com/avatars/531613242473054229/a822e90063fd0359d15fdf6ad3af64de.png?size=1024',
  prefix: 'x!',
  server_count: 300,
  short_desc: 'Advanced Moderation Bot',
  long_desc: 'Omg such an awesome bot\nI really enjoy using it!',
  ownerId: '239790360728043520',
  ownersIds: []
}

@Injectable({
  providedIn: 'root'
})
export class BotsService {
  bots: Observable<Bot[]>;
  botsSubject: BehaviorSubject<Bot[]>;

  constructor() {
    this.botsSubject = new BehaviorSubject<Bot[]>([DONBOT, NINO]);
    this.bots = this.botsSubject.asObservable();
  }

  getBots(): Observable<Bot[]> {
    return this.bots;
  }
}
