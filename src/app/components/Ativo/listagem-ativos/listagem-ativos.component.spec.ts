import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemAtivosComponent } from './listagem-ativos.component';

describe('ListagemAtivosComponent', () => {
  let component: ListagemAtivosComponent;
  let fixture: ComponentFixture<ListagemAtivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemAtivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
