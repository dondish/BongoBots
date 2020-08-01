import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { BotsService } from '../_services/bots.service';
import { Bot } from '../_models/bot';
import { ActivatedRoute } from '@angular/router';
import { map, flatMap, take } from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';


@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {
  bot: Bot;
  loading: boolean;

  constructor(private botsService: BotsService, route: ActivatedRoute) {
    this.loading = true;
    route.paramMap.pipe(
      map(m => m.get('botId')),
      flatMap(id => this.botsService.fetchBotById(id))
      ).subscribe(bot => {
      this.bot = bot;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
