import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarTransacaoComponent } from './atualizar-transacao.component';

describe('AtualizarTransacaoComponent', () => {
  let component: AtualizarTransacaoComponent;
  let fixture: ComponentFixture<AtualizarTransacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarTransacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
