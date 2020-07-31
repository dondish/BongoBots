
import { Component, OnInit } from '@angular/core';
import { Bot } from '../_models/bot';
import { BotsService } from '../_services/bots.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  botsService: BotsService;
  bots: Bot[];
  
  constructor(botsService: BotsService) { 
    this.botsService = botsService;
  }

  ngOnInit(): void {
    this.botsService.getBots().subscribe(bots => this.bots = bots);
  }

}
