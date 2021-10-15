import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarAtivoComponent } from './atualizar-ativo.component';

describe('AtualizarAtivoComponent', () => {
  let component: AtualizarAtivoComponent;
  let fixture: ComponentFixture<AtualizarAtivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarAtivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarAtivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
