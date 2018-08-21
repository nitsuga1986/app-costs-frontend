/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VentumComponent } from './ventum.component';

describe('VentumComponent', () => {
  let component: VentumComponent;
  let fixture: ComponentFixture<VentumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
