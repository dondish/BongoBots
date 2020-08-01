import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBotComponent } from './add_bot.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';

describe('AddBotComponent', () => {
  let component: AddBotComponent;
  let fixture: ComponentFixture<AddBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes)],
      declarations: [ AddBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
