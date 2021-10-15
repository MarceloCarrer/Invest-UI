import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoAtivoComponent } from './novo-ativo.component';

describe('NovoAtivoComponent', () => {
  let component: NovoAtivoComponent;
  let fixture: ComponentFixture<NovoAtivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoAtivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
