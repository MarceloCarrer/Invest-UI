import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarInvestimentoComponent } from './atualizar-investimento.component';

describe('AtualizarInvestimentoComponent', () => {
  let component: AtualizarInvestimentoComponent;
  let fixture: ComponentFixture<AtualizarInvestimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarInvestimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarInvestimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
