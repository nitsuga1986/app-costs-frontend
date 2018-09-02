import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraAddComponent } from './compra-add.component';

describe('CompraAddComponent', () => {
  let component: CompraAddComponent;
  let fixture: ComponentFixture<CompraAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
