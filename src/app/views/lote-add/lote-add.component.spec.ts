import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteAddComponent } from './lote-add.component';

describe('LoteAddComponent', () => {
  let component: LoteAddComponent;
  let fixture: ComponentFixture<LoteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
