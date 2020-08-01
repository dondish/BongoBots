import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotComponent } from './bot.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { BotsService } from '../_services/bots.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BotComponent', () => {
  let component: BotComponent;
  let fixture: ComponentFixture<BotComponent>;
  let activated: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes)],
      declarations: [ BotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotComponent);
    component = fixture.componentInstance;
    activated = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the bot', () => {
    expect(component.bot).toBeUndefined();
  });
});
