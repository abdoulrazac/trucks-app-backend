import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsDocumentComponent } from './accounts-document.component';

describe('AccountsDocumentComponent', () => {
  let component: AccountsDocumentComponent;
  let fixture: ComponentFixture<AccountsDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
