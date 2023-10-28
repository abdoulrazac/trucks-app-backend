import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsExpenseComponent } from './accounts-expense.component';

describe('AccountsExpenseComponent', () => {
  let component: AccountsExpenseComponent;
  let fixture: ComponentFixture<AccountsExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
