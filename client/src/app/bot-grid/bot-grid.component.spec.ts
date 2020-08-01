import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotGridComponent } from './bot-grid.component';

describe('BotGridComponent', () => {
  let component: BotGridComponent;
  let fixture: ComponentFixture<BotGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
