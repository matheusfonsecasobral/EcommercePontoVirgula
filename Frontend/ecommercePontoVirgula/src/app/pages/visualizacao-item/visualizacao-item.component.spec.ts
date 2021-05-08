import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoItemComponent } from './visualizacao-item.component';

describe('VisualizacaoItemComponent', () => {
  let component: VisualizacaoItemComponent;
  let fixture: ComponentFixture<VisualizacaoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacaoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
