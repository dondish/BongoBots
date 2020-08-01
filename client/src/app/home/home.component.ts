
import { Component, OnInit } from '@angular/core';
import { Bot } from '../_models/bot';
import { BotsService } from '../_services/bots.service';
import { FormControl } from '@angular/forms';
import {map, filter, flatMap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bots: Bot[];

  constructor(private botsService: BotsService) {
  }

  ngOnInit(): void {
    this.botsService.getBots().subscribe(bots => this.bots = bots);
  }

}
