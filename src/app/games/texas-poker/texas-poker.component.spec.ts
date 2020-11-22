import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexasPokerComponent } from './texas-poker.component';

describe('TexasPokerComponent', () => {
  let component: TexasPokerComponent;
  let fixture: ComponentFixture<TexasPokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TexasPokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TexasPokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
