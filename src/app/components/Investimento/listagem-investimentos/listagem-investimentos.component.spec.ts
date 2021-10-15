import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemInvestimentosComponent } from './listagem-investimentos.component';

describe('ListagemInvestimentosComponent', () => {
  let component: ListagemInvestimentosComponent;
  let fixture: ComponentFixture<ListagemInvestimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemInvestimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemInvestimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
