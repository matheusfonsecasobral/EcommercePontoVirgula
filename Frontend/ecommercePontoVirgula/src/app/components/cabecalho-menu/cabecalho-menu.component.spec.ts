import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoMenuComponent } from './cabecalho-menu.component';

describe('CabecalhoMenuComponent', () => {
  let component: CabecalhoMenuComponent;
  let fixture: ComponentFixture<CabecalhoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabecalhoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecalhoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
