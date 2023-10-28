import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsTravelComponent } from './accounts-travel.component';

describe('AccountsTravelComponent', () => {
  let component: AccountsTravelComponent;
  let fixture: ComponentFixture<AccountsTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsTravelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
