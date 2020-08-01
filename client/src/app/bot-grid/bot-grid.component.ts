import { Component, OnInit, Input } from '@angular/core';
import { Bot } from 'src/app/_models/bot';

@Component({
  selector: 'app-bot-grid',
  templateUrl: './bot-grid.component.html',
  styleUrls: ['./bot-grid.component.scss']
})
export class BotGridComponent implements OnInit {

  @Input() bots: Bot[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getStatusClass(bot: Bot): string {
    switch (bot.status) {
      case 'offline': return 'offline';
      case 'online': return 'online';
      default: return 'offline';
    }
  }

}
