import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemTransacoesComponent } from './listagem-transacoes.component';

describe('ListagemTransacoesComponent', () => {
  let component: ListagemTransacoesComponent;
  let fixture: ComponentFixture<ListagemTransacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemTransacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
